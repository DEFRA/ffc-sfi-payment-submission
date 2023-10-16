const { ES, FC, IMPS } = require('../../constants/scheme-ids')

const getLineId = (schemeId, lineId) => {
  return [ES, FC, IMPS].includes(schemeId) ? '' : lineId
}

module.exports = {
  getLineId
}
