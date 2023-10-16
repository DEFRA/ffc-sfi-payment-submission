const { EUR, GBP } = require('../../../../app/constants/currency')
const { BPS, ES, IMPS, SFI } = require('../../../../app/constants/schemes')

const { getCurrency } = require('../../../../app/batching/vendor-lines/get-currency')

describe('get currency', () => {
  test('returns EUR for BPS', () => {
    expect(getCurrency(BPS, GBP)).toBe(EUR)
  })

  test('returns empty string for ES', () => {
    expect(getCurrency(ES, GBP)).toBe('')
  })

  test('returns empty string for IMPS', () => {
    expect(getCurrency(IMPS, GBP)).toBe('')
  })

  test('returns existing currency for other schemes', () => {
    expect(getCurrency(SFI, GBP)).toBe(GBP)
  })
})
