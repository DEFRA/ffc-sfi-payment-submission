const db = require('../data')
const config = require('../config')
const { AP, AR } = require('../constants/ledgers')
const MAX_BATCH_SEQUENCE = 9999

const allocateToBatches = async (created = new Date()) => {
  const transaction = await db.sequelize.transaction()
  try {
    const schemes = await getSchemes()
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
  const queue = await db.sequelize.query(`
    SELECT
      queue.*,
      "paymentRequests"."pillar"
    FROM "queue"
    INNER JOIN "paymentRequests" 
      ON "queue"."paymentRequestId" = "paymentRequests"."paymentRequestId"
    INNER JOIN "invoiceLines"
      ON "paymentRequests"."paymentRequestId" = "invoiceLines"."paymentRequestId"
    WHERE "paymentRequests"."schemeId" = :schemeId
      AND "paymentRequests"."ledger" = :ledger
      AND "queue"."batchId" IS NULL
    ORDER BY "queue"."paymentRequestId"
    LIMIT :batchSize
    FOR UPDATE OF "queue" SKIP LOCKED
  `, {
    replacements: {
      schemeId,
      ledger,
      batchSize: config.batchSize
    },
    type: db.sequelize.QueryTypes.SELECT,
    transaction,
    raw: true
  })

  const nextPendingPillar = queue[0] ? queue[0].pillar : null

  return queue.filter(x => x.pillar === nextPendingPillar)
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
    await db.queue.update({ batchId }, {
      where: {
        paymentRequestId: paymentRequest.paymentRequestId
      },
      transaction
    })
  }
}

module.exports = allocateToBatches
