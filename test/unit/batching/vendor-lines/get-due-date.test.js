const { DUE_DATE } = require('../../../mocks/values/due-date')

const { ES, IMPS, SFI } = require('../../../../app/constants/scheme-ids')

const { getDueDate } = require('../../../../app/batching/vendor-lines/get-due-date')

describe('get due date', () => {
  test('returns empty string for ES', () => {
    expect(getDueDate(ES, DUE_DATE)).toBe('')
  })

  test('returns empty string for IMPS', () => {
    expect(getDueDate(IMPS, DUE_DATE)).toBe('')
  })

  test('returns due date for other schemes', () => {
    expect(getDueDate(SFI, DUE_DATE)).toBe(DUE_DATE)
  })
})
