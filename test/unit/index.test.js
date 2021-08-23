jest.mock('../../app/messaging')
const mockMessaging = require('../../app/messaging')
jest.mock('../../app/batching')
const mockBatching = require('../../app/batching')
jest.useFakeTimers()

describe('app', () => {
  beforeEach(() => {
    require('../../app')
  })

  test('starts batching', async () => {
    expect(mockBatching.start).toHaveBeenCalled()
  })

  test('starts messaging', async () => {
    expect(mockMessaging.start).toHaveBeenCalled()
  })
})
