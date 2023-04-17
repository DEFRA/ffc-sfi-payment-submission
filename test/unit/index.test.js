jest.mock('../../app/storage')
const mockStorage = require('../../app/storage')

jest.mock('../../app/messaging')
const mockMessaging = require('../../app/messaging')

jest.mock('../../app/batching')
const mockBatching = require('../../app/batching')

jest.useFakeTimers()

describe('app', () => {
  beforeEach(() => {
    require('../../app')
  })

  test('initialises storage', async () => {
    expect(mockStorage.initialiseContainers).toHaveBeenCalledTimes(1)
  })

  test('starts batching', async () => {
    expect(mockBatching.start).toHaveBeenCalledTimes(1)
  })

  test('starts messaging', async () => {
    expect(mockMessaging.start).toHaveBeenCalledTimes(1)
  })
})
