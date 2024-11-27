const { getSource } = require('../../../../app/batching/vendor-lines/get-source')

const {
  DA: DA_PILLAR,
  IP: IP_PILLAR,
  SPS: SPS_PILLAR,
  DF: DF_PILLAR,
  FCCS: FCCS_PILLAR,
  XG: XG_PILLAR,
  TR: TR_PILLAR,
  RDPECS: RDPECS_PILLAR,
  RDPELS: RDPELS_PILLAR,
  BK: BK_PILLAR,
  INT: INT_PILLAR,
  OPA: OPA_PILLAR,
  NELS: NELS_PILLAR,
  FCLS: FCLS_PILLAR,
  RDTLS: RDTLS_PILLAR,
  NECS: NECS_PILLAR,
  RDTCP: RDTCP_PILLAR,
  P1: P1_PILLAR,
  EA: EA_PILLAR,
  RDTEXQ: RDTEXQ_PILLAR,
  EXNRDPE: EXNRDPE_PILLAR,
  SFIP: SFIP_PILLAR
} = require('../../../../app/constants/pillars')

const {
  [DA_PILLAR]: DA_SOURCE,
  [IP_PILLAR]: IP_SOURCE,
  [SPS_PILLAR]: SPS_SOURCE,
  [DF_PILLAR]: DF_SOURCE,
  [FCCS_PILLAR]: FCCS_SOURCE,
  [XG_PILLAR]: XG_SOURCE,
  [TR_PILLAR]: TR_SOURCE,
  [RDPECS_PILLAR]: RDPECS_SOURCE,
  [RDPELS_PILLAR]: RDPELS_SOURCE,
  [BK_PILLAR]: BK_SOURCE,
  [INT_PILLAR]: INT_SOURCE,
  [OPA_PILLAR]: OPA_SOURCE,
  [NELS_PILLAR]: NELS_SOURCE,
  [FCLS_PILLAR]: FCLS_SOURCE,
  [RDTLS_PILLAR]: RDTLS_SOURCE,
  [NECS_PILLAR]: NECS_SOURCE,
  [RDTCP_PILLAR]: RDTCP_SOURCE,
  [P1_PILLAR]: P1_SOURCE,
  [EA_PILLAR]: EA_SOURCE,
  [RDTEXQ_PILLAR]: RDTEXQ_SOURCE,
  [EXNRDPE_PILLAR]: EXNRDPE_SOURCE,
  [SFIP_PILLAR]: SFIP_SOURCE
} = require('../../../../app/constants/manual-sources')

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
    { pillar: DA_PILLAR, expectedSource: DA_SOURCE },
    { pillar: IP_PILLAR, expectedSource: IP_SOURCE },
    { pillar: SPS_PILLAR, expectedSource: SPS_SOURCE },
    { pillar: DF_PILLAR, expectedSource: DF_SOURCE },
    { pillar: FCCS_PILLAR, expectedSource: FCCS_SOURCE },
    { pillar: XG_PILLAR, expectedSource: XG_SOURCE },
    { pillar: TR_PILLAR, expectedSource: TR_SOURCE },
    { pillar: RDPECS_PILLAR, expectedSource: RDPECS_SOURCE },
    { pillar: RDPELS_PILLAR, expectedSource: RDPELS_SOURCE },
    { pillar: BK_PILLAR, expectedSource: BK_SOURCE },
    { pillar: INT_PILLAR, expectedSource: INT_SOURCE },
    { pillar: OPA_PILLAR, expectedSource: OPA_SOURCE },
    { pillar: NELS_PILLAR, expectedSource: NELS_SOURCE },
    { pillar: FCLS_PILLAR, expectedSource: FCLS_SOURCE },
    { pillar: RDTLS_PILLAR, expectedSource: RDTLS_SOURCE },
    { pillar: NECS_PILLAR, expectedSource: NECS_SOURCE },
    { pillar: RDTCP_PILLAR, expectedSource: RDTCP_SOURCE },
    { pillar: P1_PILLAR, expectedSource: P1_SOURCE },
    { pillar: EA_PILLAR, expectedSource: EA_SOURCE },
    { pillar: RDTEXQ_PILLAR, expectedSource: RDTEXQ_SOURCE },
    { pillar: EXNRDPE_PILLAR, expectedSource: EXNRDPE_SOURCE },
    { pillar: SFIP_PILLAR, expectedSource: SFIP_SOURCE },
  ])('should return mapped manual source when scheme is manual and pillar can be mapped', (testParams) => {
    const source = getSource(MANUAL, SOURCE, testParams.pillar)
    expect(source).toBe(testParams.expectedSource)
  })
})
