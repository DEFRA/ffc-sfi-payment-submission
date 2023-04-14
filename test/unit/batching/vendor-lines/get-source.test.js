const { getSource } = require('../../../../app/batching/vendor-lines/get-source')
const { DA: DA_PILLAR } = require('../../../../app/constants/pillars')
const { DA: DA_SOURCE } = require('../../../../app/constants/manual-sources')
const { SFI, MANUAL } = require('../../../../app/constants/schemes')
const { SOURCE } = require('../../../mocks/values/source')

describe('get source', () => {
  test('should return current source when scheme is not manual', () => {
    const source = getSource(SFI, SOURCE, undefined)
    expect(source).toBe(SOURCE)
  })

  test('should return current source when scheme is manual and pillar is not defined', () => {
    const source = getSource(MANUAL, SOURCE, undefined)
    expect(source).toBe(SOURCE)
  })

  test('should return current source when scheme is manual and pillar cannot be mapped to source', () => {
    const source = getSource(MANUAL, SOURCE, 'invalid')
    expect(source).toBe(SOURCE)
  })

  test.each([
    { pillar: DA_PILLAR, expectedSource: DA_SOURCE }
  ])('should return mapped manual source when scheme is manual and pillar can be mapped', (pillar, expectedSource) => {
    const source = getSource(MANUAL, SOURCE, pillar)
    expect(source).toBe(expectedSource)
  })
})
