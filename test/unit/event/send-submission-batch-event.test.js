const mockSendEvents = jest.fn()
const mockPublishEvents = jest.fn()
const MockPublishEventBatch = jest.fn().mockImplementation(() => {
  return {
    sendEvents: mockSendEvents
  }
})
const MockEventPublisher = jest.fn().mockImplementation(() => {
  return {
    publishEvents: mockPublishEvents
  }
})
jest.mock('ffc-pay-event-publisher', () => {
  return {
    PublishEventBatch: MockPublishEventBatch,
    EventPublisher: MockEventPublisher
  }
})
jest.mock('../../../app/config')
const config = require('../../../app/config')
const { PAYMENT_SUBMITTED } = require('../../../app/constants/events')
const { SOURCE } = require('../../../app/constants/source')
const sendSubmissionEvents = require('../../../app/event/send-submission-batch-event')

let batch
let paymentRequest
let filename

beforeEach(() => {
  paymentRequest = JSON.parse(JSON.stringify(require('../../mocks/payment-request')))
  batch = JSON.parse(JSON.stringify(require('../../mocks/batch')))
  batch.paymentRequests = [paymentRequest, paymentRequest]

  filename = 'test.csv'

  config.useV1Events = true
  config.useV2Events = true
  config.eventTopic = 'v1-events'
  config.eventsTopic = 'v2-events'
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('V1 submission events', () => {
  test('should send V1 event if V1 events enabled', async () => {
    config.useV1Events = true
    await sendSubmissionEvents(batch, filename)
    expect(mockSendEvents).toHaveBeenCalled()
  })

  test('should not send V1 event if V1 events disabled', async () => {
    config.useV1Events = false
    await sendSubmissionEvents(batch, filename)
    expect(mockSendEvents).not.toHaveBeenCalled()
  })

  test('should send event to V1 topic', async () => {
    await sendSubmissionEvents(batch, filename)
    expect(MockPublishEventBatch.mock.calls[0][0]).toBe(config.eventTopic)
  })
  test('should use correlation Id as Id', async () => {
    await sendSubmissionEvents(batch, filename)
    expect(mockSendEvents.mock.calls[0][0][0].properties.id).toBe(batch.paymentRequests[0].correlationId)
  })

  test('should raise payment-request-submission-batch event name', async () => {
    await sendSubmissionEvents(batch, filename)
    expect(mockSendEvents.mock.calls[0][0][0].name).toBe('payment-request-submission-batch')
  })

  test('should raise success status event', async () => {
    await sendSubmissionEvents(batch, filename)
    expect(mockSendEvents.mock.calls[0][0][0].properties.status).toBe('success')
  })

  test('should raise error event type', async () => {
    await sendSubmissionEvents(batch, filename)
    expect(mockSendEvents.mock.calls[0][0][0].properties.action.type).toBe('submission')
  })

  test('should include payment published message in event', async () => {
    await sendSubmissionEvents(batch, filename)
    expect(mockSendEvents.mock.calls[0][0][0].properties.action.message).toBe('Published batch file for DAX')
  })

  test('should include payment request in event', async () => {
    await sendSubmissionEvents(batch, filename)
    expect(mockSendEvents.mock.calls[0][0][0].properties.action.data.paymentRequest).toEqual(batch.paymentRequests[0])
  })

  test('should include event for each payment request', async () => {
    await sendSubmissionEvents(batch, filename)
    expect(mockSendEvents.mock.calls[0][0].length).toBe(2)
  })
})

describe('V2 submission events', () => {
  test('should send V2 event if V2 events enabled', async () => {
    config.useV2Events = true
    await sendSubmissionEvents(batch, filename)
    expect(mockPublishEvents).toHaveBeenCalled()
  })

  test('should not send V2 event if V2 events disabled', async () => {
    config.useV2Events = false
    await sendSubmissionEvents(batch, filename)
    expect(mockPublishEvents).not.toHaveBeenCalled()
  })

  test('should send event to V2 topic', async () => {
    await sendSubmissionEvents(batch, filename)
    expect(MockEventPublisher.mock.calls[0][0]).toBe(config.eventsTopic)
  })

  test('should raise an event with processing source', async () => {
    await sendSubmissionEvents(batch, filename)
    expect(mockPublishEvents.mock.calls[0][0][0].source).toBe(SOURCE)
  })

  test('should raise acknowledged payment event type', async () => {
    await sendSubmissionEvents(batch, filename)
    expect(mockPublishEvents.mock.calls[0][0][0].type).toBe(PAYMENT_SUBMITTED)
  })

  test('should include payment request in event data', async () => {
    await sendSubmissionEvents(batch, filename)
    expect(mockPublishEvents.mock.calls[0][0][0].data).toEqual(paymentRequest)
  })

  test('should include event for each payment request', async () => {
    await sendSubmissionEvents(batch, filename)
    expect(mockPublishEvents.mock.calls[0][0].length).toBe(2)
  })
})
