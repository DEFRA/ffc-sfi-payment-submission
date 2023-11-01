const db = require('../data')
const config = require('../config')
const { AP, AR } = require('../constants/ledgers')
const MAX_BATCH_SEQUENCE = 9999

const allocateToBatches = async (created = new Date()) => {
  const transaction = await db.sequelize.transaction()
  try {
    console.log('Getting schemes')
    const schemes = await getSchemes()
    console.log('Found schemes')
    for (const scheme of schemes) {
      console.log(`Getting payments scheme ${scheme.schemeId} and ledger ${AP}`)
      const apPaymentRequests = await getPendingPaymentRequests(scheme.schemeId, AP, transaction)
      console.log(`Getting payments scheme ${scheme.schemeId} and ledger ${AR}`)
      const arPaymentRequests = await getPendingPaymentRequests(scheme.schemeId, AR, transaction)
      console.log(`Allocating to batches for scheme ${scheme.schemeId}`)
      if (apPaymentRequests.length) {
        await allocateToBatch(scheme.schemeId, apPaymentRequests, AP, created, transaction)
      }
      if (arPaymentRequests.length) {
        await allocateToBatch(scheme.schemeId, arPaymentRequests, AR, created, transaction)
      }
    }
    await transaction.commit()
  } catch (err) {
    console.log(err)
    await transaction.rollback()
    throw err
  }
}

const getSchemes = async () => {
  return db.scheme.findAll()
}

const getPendingPaymentRequests = async (schemeId, ledger, transaction) => {
  const nextPending = await db.paymentRequest.findOne({
    transaction,
    lock: true,
    skipLocked: true,
    include: [{
      model: db.invoiceLine,
      as: 'invoiceLines',
      required: true
    }],
    where: {
      ledger,
      batchId: null,
      schemeId
    },
    order: ['paymentRequestId']
  })

  const nextPendingPillar = nextPending?.pillar ? nextPending.pillar : null

  return db.paymentRequest.findAll({
    transaction,
    lock: true,
    skipLocked: true,
    include: [{
      model: db.invoiceLine,
      as: 'invoiceLines',
      required: true
    }],
    where: {
      ledger,
      batchId: null,
      schemeId,
      pillar: nextPendingPillar
    },
    order: ['paymentRequestId'],
    limit: config.batchSize
  })
}

const allocateToBatch = async (schemeId, paymentRequests, ledger, created, transaction) => {
  console.log('Getting sequence')
  const sequence = await getAndIncrementSequence(schemeId, ledger, transaction)
  console.log('Creating batch')
  const batch = await createNewBatch(schemeId, ledger, sequence, created, transaction)
  console.log('Updating payment requests')
  await updatePaymentRequests(paymentRequests, batch.batchId, transaction)
}

const getAndIncrementSequence = async (schemeId, ledger, transaction) => {
  const sequence = await getSequence(schemeId, transaction)
  let nextSequence
  if (ledger === AP) {
    nextSequence = sequence.nextAP
    sequence.nextAP = incrementSequence(sequence.nextAP)
    await updateSequence(sequence, transaction)
    return nextSequence
  }
  nextSequence = sequence.nextAR
  sequence.nextAR = incrementSequence(sequence.nextAR)
  await updateSequence(sequence, transaction)
  return nextSequence
}

const getSequence = async (schemeId, transaction) => {
  return db.sequence.findByPk(schemeId, {
    transaction,
    lock: true
  })
}

const incrementSequence = (currentSequence) => {
  // if sequence is already at maximum, then restart from 1
  return currentSequence < MAX_BATCH_SEQUENCE ? currentSequence + 1 : 1
}

const updateSequence = async (sequence, transaction) => {
  await db.sequence.update({
    nextAP: sequence.nextAP,
    nextAR: sequence.nextAR
  }, {
    where: { schemeId: sequence.schemeId },
    transaction
  })
}

const createNewBatch = async (schemeId, ledger, sequence, created, transaction) => {
  return db.batch.create({ schemeId, ledger, sequence, created }, { transaction })
}

const updatePaymentRequests = async (paymentRequests, batchId, transaction) => {
  for (const paymentRequest of paymentRequests) {
    await db.paymentRequest.update({ batchId }, {
      where: {
        paymentRequestId: paymentRequest.paymentRequestId
      },
      transaction
    })
  }
}

module.exports = allocateToBatches
