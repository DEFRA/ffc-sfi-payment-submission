const mockSendEvents = jest.fn()
const mockPublishEvent = jest.fn()
const MockPublishEventBatch = jest.fn().mockImplementation(() => {
  return {
    sendEvents: mockSendEvents
  }
})
const MockEventPublisher = jest.fn().mockImplementation(() => {
  return {
    publishEvent: mockPublishEvent
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
const { BATCH_CREATED } = require('../../../app/constants/events')
const { SOURCE } = require('../../../app/constants/source')
const sendSubmissionTransferEvents = require('../../../app/event/send-submission-transfer-event')

let batch
let paymentRequest
let filename

beforeEach(() => {
  paymentRequest = JSON.parse(JSON.stringify(require('../../mocks/payment-request')))
  batch = JSON.parse(JSON.stringify(require('../../mocks/batch')))
  batch.paymentRequests = [paymentRequest, paymentRequest]

  filename = require('../../mocks/filename')

  config.useV1Events = true
  config.useV2Events = true
  config.eventTopic = 'v1-events'
  config.eventsTopic = 'v2-events'
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('V1 submission transfer event', () => {
  test('should send V1 event if V1 events enabled', async () => {
    config.useV1Events = true
    await sendSubmissionTransferEvents(filename, batch)
    expect(mockSendEvents).toHaveBeenCalled()
  })

  test('should not send V1 event if V1 events disabled', async () => {
    config.useV1Events = false
    await sendSubmissionTransferEvents(filename, batch)
    expect(mockSendEvents).not.toHaveBeenCalled()
  })

  test('should send event to V1 topic', async () => {
    await sendSubmissionTransferEvents(filename, batch)
    expect(MockPublishEventBatch.mock.calls[0][0]).toBe(config.eventTopic)
  })
  test('should use correlation Id as Id', async () => {
    await sendSubmissionTransferEvents(filename, batch)
    expect(mockSendEvents.mock.calls[0][0][0].properties.id).toBe(batch.paymentRequests[0].correlationId)
  })

  test('should raise payment-request-submission event name', async () => {
    await sendSubmissionTransferEvents(filename, batch)
    expect(mockSendEvents.mock.calls[0][0][0].name).toBe('payment-request-submission')
  })

  test('should raise success status event', async () => {
    await sendSubmissionTransferEvents(filename, batch)
    expect(mockSendEvents.mock.calls[0][0][0].properties.status).toBe('success')
  })

  test('should raise info event type', async () => {
    await sendSubmissionTransferEvents(filename, batch)
    expect(mockSendEvents.mock.calls[0][0][0].properties.action.type).toBe('info')
  })

  test('should include payment published message in event', async () => {
    await sendSubmissionTransferEvents(filename, batch)
    expect(mockSendEvents.mock.calls[0][0][0].properties.action.message).toBe('Payment request submission scheduled')
  })

  test('should include batch Id in event', async () => {
    await sendSubmissionTransferEvents(filename, batch)
    expect(mockSendEvents.mock.calls[0][0][0].properties.action.data.batchId).toBe(batch.batchId)
  })

  test('should include filename in event', async () => {
    await sendSubmissionTransferEvents(filename, batch)
    expect(mockSendEvents.mock.calls[0][0][0].properties.action.data.filename).toBe(filename)
  })

  test('should include ledger in event', async () => {
    await sendSubmissionTransferEvents(filename, batch)
    expect(mockSendEvents.mock.calls[0][0][0].properties.action.data.ledger).toBe(batch.ledger)
  })

  test('should include event for each payment request', async () => {
    await sendSubmissionTransferEvents(filename, batch)
    expect(mockSendEvents.mock.calls[0][0].length).toBe(2)
  })
})

describe('V2 submission transfer events', () => {
  test('should send V2 event if V2 events enabled', async () => {
    config.useV2Events = true
    await sendSubmissionTransferEvents(filename, batch)
    expect(mockPublishEvent).toHaveBeenCalled()
  })

  test('should not send V2 event if V2 events disabled', async () => {
    config.useV2Events = false
    await sendSubmissionTransferEvents(filename, batch)
    expect(mockPublishEvent).not.toHaveBeenCalled()
  })

  test('should send event to V2 topic', async () => {
    await sendSubmissionTransferEvents(filename, batch)
    expect(MockEventPublisher.mock.calls[0][0]).toBe(config.eventsTopic)
  })

  test('should raise an event with processing source', async () => {
    await sendSubmissionTransferEvents(filename, batch)
    expect(mockPublishEvent.mock.calls[0][0].source).toBe(SOURCE)
  })

  test('should raise acknowledged payment event type', async () => {
    await sendSubmissionTransferEvents(filename, batch)
    expect(mockPublishEvent.mock.calls[0][0].type).toBe(BATCH_CREATED)
  })

  test('should include filename as subject', async () => {
    await sendSubmissionTransferEvents(filename, batch)
    expect(mockPublishEvent.mock.calls[0][0].subject).toBe(filename)
  })
})
