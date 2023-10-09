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
} = require("./scheme-ids")
const { 
  SFI: SFI_NAME,
  SFIP: SFIP_NAME,
  LumpSums: LumpSums_NAME,
  VetVisits: VetVisits_NAME,
  CS: CS_NAME,
  BPS: BPS_NAME,
  FDMR: FDMR_NAME,
  MANUAL: MANUAL_NAME,
  ES: ES_NAME,
  FC: FC_NAME,
  IMPS: IMPS_NAME,
  SFI23: SFI23_NAME
} = require("./scheme-names")

module.exports = [
  { schemeId: SFI, name: SFI_NAME },
  { schemeId: SFIP, name: SFIP_NAME },
  { schemeId: LumpSums, name: LumpSums_NAME },
  { schemeId: VetVisits, name: VetVisits_NAME },
  { schemeId: CS, name: CS_NAME },
  { schemeId: BPS, name: BPS_NAME },
  { schemeId: FDMR, name: FDMR_NAME },
  { schemeId: MANUAL, name: MANUAL_NAME },
  { schemeId: ES, name: ES_NAME },
  { schemeId: FC, name: FC_NAME },
  { schemeId: IMPS, name: IMPS_NAME },
  { schemeId: SFI23, name: SFI23_NAME }
]