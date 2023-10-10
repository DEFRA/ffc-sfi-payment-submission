const {
  SFI,
  SFIP,
  LumpSums,
  VetVisits,
  CS,
  BPS,
  FDMR,
  MANUAL,
  ES,
  FC,
  IMPS,
  SFI23
} = require('../../../app/constants/scheme-ids')
const {
  SFI: SFI_PFX,
  SFIP: SFIP_PFX,
  LumpSums: lumpSums_PFX,
  VetVisits: vetVisits_PFX,
  CS: CS_PFX,
  BPS: BPS_PFX,
  FDMR: FDMR_PFX,
  MANUAL: MANUAL_PFX,
  ES: ES_PFX,
  FC: FC_PFX,
  IMPS: IMPS_PFX,
  SFI23: SFI23_PFX
} = require('../../../app/constants/prefixes')
const {
  SFI: SFI_SFX,
  SFIP: SFIP_SFX,
  LumpSums: lumpSums_SFX,
  VetVisits: vetVisits_SFX,
  CS: CS_SFX,
  BPS: BPS_SFX,
  FDMR: FDMR_SFX,
  MANUAL: MANUAL_SFX,
  ES: ES_SFX,
  FC: FC_SFX,
  IMPS: IMPS_SFX,
  SFI23: SFI23_SFX
} = require('../../../app/constants/suffixes')

const { getPrefixAndSuffix } = require('../../../app/batching/get-prefix-and-suffix')

describe('get prefix and suffix', () => {
  test('returns correct prefix for SFI', () => {
    expect(getPrefixAndSuffix(SFI)[0]).toBe(SFI_PFX)
  })

  test('returns correct suffix for SFI', () => {
    expect(getPrefixAndSuffix(SFI)[1]).toBe(SFI_SFX)
  })

  test('returns correct prefix for SFIP', () => {
    expect(getPrefixAndSuffix(SFIP)[0]).toBe(SFIP_PFX)
  })

  test('returns correct suffix for SFIP', () => {
    expect(getPrefixAndSuffix(SFIP)[1]).toBe(SFIP_SFX)
  })

  test('returns correct prefix for LumpSums', () => {
    expect(getPrefixAndSuffix(LumpSums)[0]).toBe(lumpSums_PFX)
  })

  test('returns correct suffix for LumpSums', () => {
    expect(getPrefixAndSuffix(LumpSums)[1]).toBe(lumpSums_SFX)
  })

  test('returns correct prefix for VetVisits', () => {
    expect(getPrefixAndSuffix(VetVisits)[0]).toBe(vetVisits_PFX)
  })

  test('returns correct suffix for VetVisits', () => {
    expect(getPrefixAndSuffix(VetVisits)[1]).toBe(vetVisits_SFX)
  })

  test('returns correct prefix for CS', () => {
    expect(getPrefixAndSuffix(CS)[0]).toBe(CS_PFX)
  })

  test('returns correct suffix for CS', () => {
    expect(getPrefixAndSuffix(CS)[1]).toBe(CS_SFX)
  })

  test('returns correct prefix for BPS', () => {
    expect(getPrefixAndSuffix(BPS)[0]).toBe(BPS_PFX)
  })

  test('returns correct suffix for BPS', () => {
    expect(getPrefixAndSuffix(BPS)[1]).toBe(BPS_SFX)
  })

  test('returns correct prefix for FDMR', () => {
    expect(getPrefixAndSuffix(FDMR)[0]).toBe(FDMR_PFX)
  })

  test('returns correct suffix for FDMR', () => {
    expect(getPrefixAndSuffix(FDMR)[1]).toBe(FDMR_SFX)
  })

  test('returns correct prefix for MANUAL', () => {
    expect(getPrefixAndSuffix(MANUAL)[0]).toBe(MANUAL_PFX)
  })

  test('returns correct suffix for MANUAL', () => {
    expect(getPrefixAndSuffix(MANUAL)[1]).toBe(MANUAL_SFX)
  })

  test('returns correct prefix for ES', () => {
    expect(getPrefixAndSuffix(ES)[0]).toBe(ES_PFX)
  })

  test('returns correct suffix for ES', () => {
    expect(getPrefixAndSuffix(ES)[1]).toBe(ES_SFX)
  })

  test('returns correct prefix for FC', () => {
    expect(getPrefixAndSuffix(FC)[0]).toBe(FC_PFX)
  })

  test('returns correct suffix for FC', () => {
    expect(getPrefixAndSuffix(FC)[1]).toBe(FC_SFX)
  })

  test('returns correct prefix for IMPS', () => {
    expect(getPrefixAndSuffix(IMPS)[0]).toBe(IMPS_PFX)
  })

  test('returns correct suffix for IMPS', () => {
    expect(getPrefixAndSuffix(IMPS)[1]).toBe(IMPS_SFX)
  })

  test('returns correct prefix for SFI23', () => {
    expect(getPrefixAndSuffix(SFI23)[0]).toBe(SFI23_PFX)
  })

  test('returns correct suffix for SFI23', () => {
    expect(getPrefixAndSuffix(SFI23)[1]).toBe(SFI23_SFX)
  })
})
