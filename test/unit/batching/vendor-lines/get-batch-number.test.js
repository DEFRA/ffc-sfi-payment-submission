const { ES, SFI } = require('../../../../app/constants/schemes')

const { getBatchNumber } = require('../../../../app/batching/vendor-lines/get-batch-number')

describe('get batch number', () => {
  test('returns empty string for ES', () => {
    const sequence = 1
    expect(getBatchNumber(ES, sequence)).toBe('')
  })

  test('pads sequence number with leading zeros to four digits if sequence is 1 digit and scheme is not ES', () => {
    const sequence = 1
    expect(getBatchNumber(SFI, sequence)).toBe('0001')
  })

  test('pads sequence number with leading zeros to four digits if sequence is 2 digits and scheme is not ES', () => {
    const sequence = 10
    expect(getBatchNumber(SFI, sequence)).toBe('0010')
  })

  test('pads sequence number with leading zeros to four digits if sequence is 3 digits and scheme is not ES', () => {
    const sequence = 100
    expect(getBatchNumber(SFI, sequence)).toBe('0100')
  })

  test('does not pad sequence number with leading zeros if sequence is 4 digits and scheme is not ES', () => {
    const sequence = 1000
    expect(getBatchNumber(SFI, sequence)).toBe('1000')
  })
})
