const db = require('../data')
const moment = require('moment')
const config = require('../config')

const getBatches = async (transaction, started = new Date()) => {
  const batches = await getPendingBatches(started, transaction)
  await updateStarted(batches, started, transaction)
  return batches
}

const getPendingBatches = async (started, transaction) => {
  const batches = await db.batch.findAll({
    transaction,
    lock: true,
    skipLocked: true,
    limit: config.batchCap,
    order: ['sequence'],
    include: [{
      model: db.paymentRequest,
      as: 'paymentRequests',
      required: true,
      include: [{
        model: db.invoiceLine,
        as: 'invoiceLines',
        required: true
      }]
    }],
    where: {
      published: null,
      [db.Sequelize.Op.or]: [{
        started: null
      }, {
        started: { [db.Sequelize.Op.lte]: moment(started).subtract(5, 'minutes').toDate() }
      }]
    }
  })

  return batches.map(x => x.get({ plain: true }))
}

const updateStarted = async (batches, started, transaction) => {
  for (const batch of batches) {
    await db.batch.update({ started }, {
      where: {
        batchId: batch.batchId
      },
      transaction
    })
  }
}

module.exports = getBatches
