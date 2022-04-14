const raiseEvents = require('./raise-events')
const { v4: uuidv4 } = require('uuid')

const sendSubmissionTransferEvent = async (filename, batch) => {
  const events = batch.paymentRequests.map(paymentRequest => ({
    id: paymentRequest.correlationId ?? uuidv4(),
    name: 'payment-request-submission',
    type: 'info',
    message: 'Payment request submission scheduled',
    data: { batchId: batch.batchId, filename, ledger: batch.ledger }

  }))
  await raiseEvents(events)
}

module.exports = sendSubmissionTransferEvent
