jest.mock('../../../app/batching/generate-batches')
const mockGenerateBatches = require('../../../app/batching/generate-batches')
jest.useFakeTimers()
const batching = require('../../../app/batching')

describe('batch service', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('starts generation', async () => {
    await batching.start()
    expect(mockGenerateBatches).toHaveBeenCalled()
  })
})
