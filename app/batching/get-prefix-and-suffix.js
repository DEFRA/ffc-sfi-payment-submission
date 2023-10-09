const batchProperties = require('../constants/batch-properties')

const getPrefixAndSuffix = (schemeId) => {
  const schemeIdx = batchProperties.findIndex(scheme => scheme.schemeId === schemeId)
  const prefix = batchProperties[schemeIdx].prefix
  const suffix = batchProperties[schemeIdx].suffix
  return [prefix, suffix]
}

module.exports = {
  getPrefixAndSuffix
}
