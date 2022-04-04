const raiseEvent = require('./raise-event')
const { v4: uuidv4 } = require('uuid')

const sendSubmissionErrorEvent = async (paymentRequest, error) => {
  const correlationId = paymentRequest?.correlationId ?? uuidv4()
  const event = {
    id: correlationId,
    name: 'payment-request-submission-error',
    type: 'error',
    message: error.message,
    data: { paymentRequest }
  }
  await raiseEvent(event, 'error', error)
}

module.exports = sendSubmissionErrorEvent
