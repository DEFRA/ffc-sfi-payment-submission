const {
  DA,
  IP,
  SPS,
  DF,
  FCCS,
  XG,
  TR,
  RDPECS,
  RDPELS,
  BK,
  INT,
  OPA,
  NELS,
  FCLS,
  RDTLS,
  NECS,
  RDTCP,
  P1,
  EA,
  RDTEXQ,
  EXNRDPE,
  SFI,
  SFIP,
  LSES,
  AHWR,
  CS,
  BPS,
  FDMR,
  ES,
  FC,
  IMPS,
  SFI23,
  DP,
  ESFIO
} = require('./pillars')

module.exports = {
  [DA]: 'NMAN_DA',
  [IP]: 'NMAN_IP',
  [SPS]: 'NMAN_SPS',
  [DF]: 'NMAN_DF',
  [FCCS]: 'NMAN_FC',
  [XG]: 'NMAN_XG',
  [TR]: 'NMAN_TR',
  [RDPECS]: 'NMAN_RDPE',
  [RDPELS]: 'NMAN_RDPE',
  [BK]: 'NMAN_BK',
  [INT]: 'NMAN_INT',
  [OPA]: 'NMAN_OPA',
  [NELS]: 'NMAN_NELS',
  [FCLS]: 'NMAN_FCLS',
  [RDTLS]: 'NMAN_RDT',
  [NECS]: 'NMAN_NE',
  [RDTCP]: 'NMAN_RDT',
  [P1]: 'NMAN_NE',
  [EA]: 'NMAN_EA',
  [RDTEXQ]: 'NMAN_RDT',
  [EXNRDPE]: 'NMAN_RDT',
  [SFI]: 'PMAN_SFI',
  [SFIP]: 'PMAN_SFIP',
  [LSES]: 'NMAN_DA',
  [AHWR]: 'NMAN_DA',
  [CS]: 'NMAN_DA',
  [BPS]: 'NMAN_DA',
  [FDMR]: 'NMAN_DA',
  [ES]: 'NMAN_DA',
  [FC]: 'NMAN_DA',
  [IMPS]: 'NMAN_DA',
  [SFI23]: 'PMAN_SFIA',
  [DP]: 'PMAN_DP',
  [ESFIO]: 'PMAN_ESFIO'
}
