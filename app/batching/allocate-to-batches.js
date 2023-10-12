const db = require('../data')
const config = require('../config')
const { AP, AR } = require('../constants/ledgers')
const MAX_BATCH_SEQUENCE = 9999

const allocateToBatches = async (created = new Date()) => {
  const transaction = await db.sequelize.transaction()
  const schemes = await getSchemes()
  try {
    for (const scheme of schemes) {
      const apPaymentRequests = await getPendingPaymentRequests(scheme.schemeId, AP, transaction)
      const arPaymentRequests = await getPendingPaymentRequests(scheme.schemeId, AR, transaction)
      if (apPaymentRequests.length) {
        await allocateToBatch(scheme.schemeId, apPaymentRequests, AP, created, transaction)
      }
      if (arPaymentRequests.length) {
        await allocateToBatch(scheme.schemeId, arPaymentRequests, AR, created, transaction)
      }
    }
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw (error)
  }
}

const getSchemes = async () => {
  return db.scheme.findAll()
}

const getPendingPaymentRequests = async (schemeId, ledger, transaction) => {
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
      schemeId
    },
    order: ['paymentRequestId'],
    limit: config.batchSize
  })
}

const allocateToBatch = async (schemeId, paymentRequests, ledger, created, transaction) => {
  const sequence = await getAndIncrementSequence(schemeId, ledger, transaction)
  const batch = await createNewBatch(schemeId, ledger, sequence, created, transaction)
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
