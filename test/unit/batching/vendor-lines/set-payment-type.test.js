const { BPS, CS, FDMR, LumpSums, SFI, SFIP, VetVisits } = require('../../../../app/constants/schemes')
const setPaymentType = require('../../../../app/batching/vendor-lines/set-payment-type')

describe('set payment type tests', () => {
  let paymentType

  beforeEach(() => {
  })

  test('Return 1 when schemeId is CS and paymentType is 1', async () => {
    paymentType = '1'
    const result = setPaymentType(CS, paymentType)
    expect(result).toBe(1)
  })

  test('Return 0 when schemeId is CS and paymentType is 0', async () => {
    paymentType = '0'
    const result = setPaymentType(CS, paymentType)
    expect(result).toBe(0)
  })

  test('Return 0 when schemeId is CS and paymentType is 2', async () => {
    paymentType = '0'
    const result = setPaymentType(CS, paymentType)
    expect(result).toBe(0)
  })

  test('Return "" when schemeId is BPS and paymentType is undefined', async () => {
    paymentType = undefined
    const result = setPaymentType(BPS, paymentType)
    expect(result).toBe('')
  })

  test('Return "" when schemeId is BPS and paymentType is "0" ', async () => {
    paymentType = '0'
    const result = setPaymentType(BPS, paymentType)
    expect(result).toBe('')
  })

  test('Return "" when schemeId is FDMR and paymentType is undefined', async () => {
    paymentType = undefined
    const result = setPaymentType(FDMR, paymentType)
    expect(result).toBe('')
  })

  test('Return "" when schemeId is FDMR and paymentType is "0" ', async () => {
    paymentType = '0'
    const result = setPaymentType(FDMR, paymentType)
    expect(result).toBe('')
  })

  test('Return "0" when schemeId is LumpSums and paymentType is "0" ', async () => {
    paymentType = '0'
    const result = setPaymentType(LumpSums, paymentType)
    expect(result).toBe(0)
  })

  test('Return "0" when schemeId is SFI and paymentType is "0" ', async () => {
    paymentType = '0'
    const result = setPaymentType(SFI, paymentType)
    expect(result).toBe(0)
  })

  test('Return "0" when schemeId is SFIP and paymentType is "0" ', async () => {
    paymentType = '0'
    const result = setPaymentType(SFIP, paymentType)
    expect(result).toBe(0)
  })

  test('Return "0" when schemeId is VetVisits and paymentType is "0" ', async () => {
    paymentType = '0'
    const result = setPaymentType(VetVisits, paymentType)
    expect(result).toBe(0)
  })
})
