const { EventPublisher } = require('ffc-pay-event-publisher')
const { v4: uuidv4 } = require('uuid')
const raiseEvents = require('./raise-events')
const config = require('../config')
const { BATCH_CREATED } = require('../constants/events')
const { SOURCE } = require('../constants/source')

const sendSubmissionTransferEvent = async (filename, batch) => {
  if (config.useV1Events) {
    await sendV1SubmissionTransferEvent(filename, batch)
  }
  if (config.useV2Events) {
    await sendV2SubmissionTransferEvent(filename, batch)
  }
}

const sendV1SubmissionTransferEvent = async (filename, batch) => {
  const events = batch.paymentRequests.map(paymentRequest => ({
    id: paymentRequest.correlationId ?? uuidv4(),
    name: 'payment-request-submission',
    type: 'info',
    message: 'Payment request submission scheduled',
    data: { batchId: batch.batchId, filename, ledger: batch.ledger }

  }))
  await raiseEvents(events)
}

const sendV2SubmissionTransferEvent = async (filename, batch) => {
  const event = {
    source: SOURCE,
    type: BATCH_CREATED,
    subject: filename,
    data: {
      filename
    }
  }
  const eventPublisher = new EventPublisher(config.eventsTopic)
  await eventPublisher.publishEvent(event)
}

module.exports = sendSubmissionTransferEvent
