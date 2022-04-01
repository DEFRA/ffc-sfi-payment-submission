const raiseEvent = require('./raise-event')
const { v4: uuidv4 } = require('uuid')

const sendSubmissionBatchEvent = async (batch, fileName) => {
  const batchId = batch.batchId
  for (const paymentRequest of batch.paymentRequests) {
    const correlationId = paymentRequest?.correlationId ?? uuidv4()
    const frn = paymentRequest?.frn ?? null
    const paymentRequestNumber = paymentRequest?.paymentRequestNumber ?? null
    const agreementNumber = paymentRequest?.agreementNumber ?? null
    const event = {
      id: correlationId,
      name: 'payment-request-submission-batch',
      type: 'submission',
      message: 'Publish payment request batch for DAX',
      data: {
        batchId,
        fileName,
        paymentRequestNumber,
        agreementNumber,
        frn,
        paymentRequest
      }
    }
    await raiseEvent(event)
  }
}

module.exports = sendSubmissionBatchEvent
