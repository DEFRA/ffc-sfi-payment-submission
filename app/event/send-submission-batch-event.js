const raiseEvents = require('./raise-events')
const { v4: uuidv4 } = require('uuid')
const config = require('../config')
const { EventPublisher } = require('ffc-pay-event-publisher')

const sendSubmissionBatchEvent = async (batch, filename) => {
  if (config.useV1Events) {
    await sendV1SubmissionBatchEvent(batch, filename)
  }
  if (config.useV2Events) {
    await sendV2SubmissionBatchEvent(batch, filename)
  }
}

const sendV1SubmissionBatchEvent = async (batch, fileName) => {
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

const sendV2SubmissionBatchEvent = async (batch, filename) => {
  const events = batch.paymentRequests.map(paymentRequest => createEvent(paymentRequest, filename))
  const eventPublisher = new EventPublisher(config.eventsTopic)
  await eventPublisher.publishEvents(events)
}

const createEvent = (paymentRequest, filename) => {
  return {
    source: 'ffc-pay-submission',
    type: 'uk.gov.defra.ffc.pay.payment.submitted',
    subject: filename,
    data: paymentRequest
  }
}

module.exports = sendSubmissionBatchEvent
