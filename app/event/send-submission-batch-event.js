const raiseEvents = require('./raise-events')
const { v4: uuidv4 } = require('uuid')

const sendSubmissionBatchEvent = async (batch, fileName) => {
  const events = batch.paymentRequests.map(paymentRequest => ({
    id: paymentRequest.correlationId ?? uuidv4(),
    name: 'payment-request-submission-batch',
    type: 'submission',
    message: 'Published batch file for DAX',
    data: {
      batchId: batch.batchId,
      fileName,
      paymentRequestNumber: paymentRequest.paymentRequestNumber,
      agreementNumber: paymentRequest.agreementNumber,
      frn: paymentRequest.frn,
      paymentRequest
    }
  }))
  await raiseEvents(events)
}

module.exports = sendSubmissionBatchEvent
