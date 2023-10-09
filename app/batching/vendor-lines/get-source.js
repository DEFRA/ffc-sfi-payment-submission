const { MANUAL } = require('../../constants/scheme-ids')
const manualSources = require('../../constants/manual-sources')

const getSource = (schemeId, source, pillar) => {
  if (schemeId !== MANUAL) {
    return source
  }

  const manualSource = manualSources[pillar]
  return manualSource ?? source
}

module.exports = {
  getSource
}
