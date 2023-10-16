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
} = require('./scheme-ids')
const {
  SFI: SFI_PFX,
  SFIP: SFIP_PFX,
  LumpSums: LS_PFX,
  VetVisits: VV_PFX,
  CS: CS_PFX,
  BPS: BPS_PFX,
  FDMR: FDMR_PFX,
  MANUAL: MANUAL_PFX,
  ES: ES_PFX,
  FC: FC_PFX,
  IMPS: IMPS_PFX,
  SFI23: SFI23_PFX
} = require('./prefixes')
const {
  SFI: SFI_SFX,
  SFIP: SFIP_SFX,
  LumpSums: LS_SFX,
  VetVisits: VV_SFX,
  CS: CS_SFX,
  BPS: BPS_SFX,
  FDMR: FDMR_SFX,
  MANUAL: MANUAL_SFX,
  ES: ES_SFX,
  FC: FC_SFX,
  IMPS: IMPS_SFX,
  SFI23: SFI23_SFX
} = require('./suffixes')
const {
  SFI: SFI_SRC,
  SFIP: SFIP_SRC,
  LumpSums: LS_SRC,
  VetVisits: VV_SRC,
  CS: CS_SRC,
  BPS: BPS_SRC,
  FDMR: FDMR_SRC,
  MANUAL: MANUAL_SRC,
  ES: ES_SRC,
  FC: FC_SRC,
  IMPS: IMPS_SRC,
  SFI23: SFI23_SRC
} = require('./scheme-sources')

module.exports = [
  { schemeId: SFI, prefix: SFI_PFX, suffix: SFI_SFX, source: SFI_SRC },
  { schemeId: SFIP, prefix: SFIP_PFX, suffix: SFIP_SFX, source: SFIP_SRC },
  { schemeId: LumpSums, prefix: LS_PFX, suffix: LS_SFX, source: LS_SRC },
  { schemeId: VetVisits, prefix: VV_PFX, suffix: VV_SFX, source: VV_SRC },
  { schemeId: CS, prefix: CS_PFX, suffix: CS_SFX, source: CS_SRC },
  { schemeId: BPS, prefix: BPS_PFX, suffix: BPS_SFX, source: BPS_SRC },
  { schemeId: FDMR, prefix: FDMR_PFX, suffix: FDMR_SFX, source: FDMR_SRC },
  { schemeId: MANUAL, prefix: MANUAL_PFX, suffix: MANUAL_SFX, source: MANUAL_SRC },
  { schemeId: ES, prefix: ES_PFX, suffix: ES_SFX, source: ES_SRC },
  { schemeId: FC, prefix: FC_PFX, suffix: FC_SFX, source: FC_SRC },
  { schemeId: IMPS, prefix: IMPS_PFX, suffix: IMPS_SFX, source: IMPS_SRC },
  { schemeId: SFI23, prefix: SFI23_PFX, suffix: SFI23_SFX, source: SFI23_SRC }
]
