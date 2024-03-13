const { BPS } = require('../../constants/schemes')

const getLegacyIdentifier = (schemeId, FRN) => {
  if (schemeId === BPS) {
    return FRN
  }
  return ''
}

module.exports = {
  getLegacyIdentifier
}
