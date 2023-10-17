const { FC } = require('../../../../app/constants/schemes')

const { getHeaderDescription } = require('../../../../app/batching/vendor-lines/get-header-description')

let paymentRequest

describe('get header description', () => {
  beforeEach(() => {
    paymentRequest = {
      invoiceLines: [{
        description: 'Description'
      }]
    }
  })

  test('returns empty string if scheme is not FC', () => {
    const result = getHeaderDescription(paymentRequest)
    expect(result).toBe('')
  })

  test('returns empty string if invoiceLines is empty and scheme is not FC', () => {
    paymentRequest.schemeId = FC
    paymentRequest.invoiceLines = []
    const result = getHeaderDescription(paymentRequest)
    expect(result).toBe('')
  })

  test('returns empty string if invoiceLines is undefined and scheme is FC', () => {
    paymentRequest.schemeId = FC
    paymentRequest.invoiceLines = undefined
    const result = getHeaderDescription(paymentRequest)
    expect(result).toBe('')
  })

  test('returns empty string if invoiceLines is null and scheme is FC', () => {
    paymentRequest.schemeId = FC
    paymentRequest.invoiceLines = null
    const result = getHeaderDescription(paymentRequest)
    expect(result).toBe('')
  })

  test('returns empty string if invoiceLines do not have description and scheme is FC', () => {
    paymentRequest.schemeId = FC
    paymentRequest.invoiceLines = [{}]
    const result = getHeaderDescription(paymentRequest)
    expect(result).toBe('')
  })

  test('returns description if invoiceLines has description and scheme is FC', () => {
    paymentRequest.schemeId = FC
    const result = getHeaderDescription(paymentRequest)
    expect(result).toBe('Description')
  })
})
