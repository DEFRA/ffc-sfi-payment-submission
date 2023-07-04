const { BPS, CS, FDMR, LumpSums, SFI, SFIP, VetVisits } = require('../../../../app/constants/schemes')
const { getPaymentType } = require('../../../../app/batching/vendor-lines/get-payment-type')

describe('get payment type tests', () => {
  let paymentType

  test('Return 1 when schemeId is CS and paymentType is 1', async () => {
    paymentType = '1'
    const result = getPaymentType(CS, paymentType)
    expect(result).toBe(1)
  })

  test('Return 0 when schemeId is CS and paymentType is 0', async () => {
    paymentType = '0'
    const result = getPaymentType(CS, paymentType)
    expect(result).toBe(0)
  })

  test('Return 0 when schemeId is CS and paymentType is 2', async () => {
    paymentType = '0'
    const result = getPaymentType(CS, paymentType)
    expect(result).toBe(0)
  })

  test('Return "" when schemeId is BPS and paymentType is undefined', async () => {
    paymentType = undefined
    const result = getPaymentType(BPS, paymentType)
    expect(result).toBe('')
  })

  test('Return "" when schemeId is BPS and paymentType is "0" ', async () => {
    paymentType = '0'
    const result = getPaymentType(BPS, paymentType)
    expect(result).toBe('')
  })

  test('Return "" when schemeId is FDMR and paymentType is undefined', async () => {
    paymentType = undefined
    const result = getPaymentType(FDMR, paymentType)
    expect(result).toBe('')
  })

  test('Return "" when schemeId is FDMR and paymentType is "0" ', async () => {
    paymentType = '0'
    const result = getPaymentType(FDMR, paymentType)
    expect(result).toBe('')
  })

  test('Return 0 when schemeId is LumpSums and paymentType is "0" ', async () => {
    paymentType = '0'
    const result = getPaymentType(LumpSums, paymentType)
    expect(result).toBe(0)
  })

  test('Return 0 when schemeId is SFI and paymentType is "0" ', async () => {
    paymentType = '0'
    const result = getPaymentType(SFI, paymentType)
    expect(result).toBe(0)
  })

  test('Return 0 when schemeId is SFIP and paymentType is "0" ', async () => {
    paymentType = '0'
    const result = getPaymentType(SFIP, paymentType)
    expect(result).toBe(0)
  })

  test('Return 0 when schemeId is VetVisits and paymentType is "0" ', async () => {
    paymentType = '0'
    const result = getPaymentType(VetVisits, paymentType)
    expect(result).toBe(0)
  })
})
