const allocateToBatches = require('./allocate-to-batches')
const getBatches = require('./get-batches')
const getFileName = require('./get-filename')
const getContent = require('./get-content')
const publishBatch = require('./publish-batch')
const completeBatch = require('./complete-batch')
const sendFileTransferMessage = require('../messaging/send-file-transfer-message')
const { sendSubmissionBatchEvent } = require('../event')

const generateBatches = async () => {
  await allocateToBatches()
  const batches = await getBatches()
  for (const batch of batches) {
    const filename = getFileName(batch)
    const content = getContent(batch)
    await publishBatch(filename, content)
    await sendSubmissionBatchEvent(batch, filename)
    await sendFileTransferMessage(filename, batch)
    await completeBatch(batch.batchId)
  }
}

module.exports = generateBatches
