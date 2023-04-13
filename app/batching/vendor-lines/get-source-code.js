const { MANUAL } = require('../../constants/schemes')

const getSourceCode = (schemeId, source, pillar) => {
  if (schemeId !== MANUAL) {
    return source
  }

  // TODO: need pillars
}

module.exports = {
  getSourceCode
}
