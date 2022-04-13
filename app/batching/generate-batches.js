const allocateToBatches = require('./allocate-to-batches')
const getBatches = require('./get-batches')
const getFileName = require('./get-filename')
const getContent = require('./get-content')
const publishBatch = require('./publish-batch')
const completeBatch = require('./complete-batch')
const sendFileTransferMessage = require('../messaging/send-file-transfer-message')
const { sendSubmissionBatchEvent } = require('../event')
const db = require('../data')

const generateBatches = async () => {
  const transaction = await db.sequelize.transaction()
  await allocateToBatches(transaction)
  try {
    const batches = await getBatches(transaction)
    for (const batch of batches) {
      const filename = getFileName(batch)
      const content = getContent(batch)
      await publishBatch(filename, content)
      await sendSubmissionBatchEvent(batch, filename)
      await sendFileTransferMessage(filename, batch)
      await completeBatch(batch.batchId, transaction)
    }
    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw (error)
  }
}

module.exports = generateBatches
