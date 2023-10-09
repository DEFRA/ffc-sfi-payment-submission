const { ES, IMPS, SFI } = require('../../../../app/constants/scheme-ids')

const { getLineId } = require('../../../../app/batching/ledger-lines/get-line-id')

const lineId = 1

describe('get line id', () => {
  test('returns empty string for ES', () => {
    expect(getLineId(ES, lineId)).toBe('')
  })

  test('returns empty string for IMPS', () => {
    expect(getLineId(IMPS, lineId)).toBe('')
  })

  test('returns 1 for other schemes', () => {
    expect(getLineId(SFI, lineId)).toBe(1)
  })
})
