const { CS, ES, FC, IMPS, VetVisits } = require('../../../app/constants/scheme-sources')
const { agreementNumber } = require('../../mocks/values/agreement-number')

const { getAgreementReference } = require('../../../app/batching/get-agreement-reference')

describe('get agreement reference', () => {
  test('returns agreement reference if source is SitiELM', () => {
    expect(getAgreementReference('SitiELM', agreementNumber)).toBe(agreementNumber)
  })

  test('returns agreement reference if source is CS', () => {
    expect(getAgreementReference(CS, agreementNumber)).toBe(agreementNumber)
  })

  test('returns empty string if source starts with SITI', () => {
    expect(getAgreementReference('SITI_somethingelse', agreementNumber)).toBe('')
  })

  test('returns empty string if source starts with Siti', () => {
    expect(getAgreementReference('Siti_somethingelse', agreementNumber)).toBe('')
  })

  test('returns empty string if source starts with siti', () => {
    expect(getAgreementReference('siti_somethingelse', agreementNumber)).toBe('')
  })

  test('returns empty string if source is ES', () => {
    expect(getAgreementReference(ES, agreementNumber)).toBe('')
  })

  test('returns empty string if source is FC', () => {
    expect(getAgreementReference(FC, agreementNumber)).toBe('')
  })

  test('returns empty string if source is IMPS', () => {
    expect(getAgreementReference(IMPS, agreementNumber)).toBe('')
  })

  test('returns agreement number if source is anything else', () => {
    expect(getAgreementReference(VetVisits, agreementNumber)).toBe(agreementNumber)
  })
})
