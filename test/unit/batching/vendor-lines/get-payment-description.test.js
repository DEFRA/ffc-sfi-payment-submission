const { BPS, FDMR, ES, IMPS, SFI } = require('../../../../app/constants/schemes')

const { getPaymentDescription } = require('../../../../app/batching/vendor-lines/get-payment-description')

describe('get payment description', () => {
  test('returns empty string for BPS', () => {
    expect(getPaymentDescription(BPS)).toBe('')
  })

  test('returns empty string for FDMR', () => {
    expect(getPaymentDescription(FDMR)).toBe('')
  })

  test('returns empty string for ES', () => {
    expect(getPaymentDescription(ES)).toBe('')
  })

  test('returns PAY for IMPS', () => {
    expect(getPaymentDescription(IMPS)).toBe('PAY')
  })

  test('returns 1 for other schemes', () => {
    expect(getPaymentDescription(SFI)).toBe(1)
  })
})
