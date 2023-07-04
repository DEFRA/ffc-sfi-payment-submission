const { ES, IMPS } = require('../../constants/schemes')

const getLineId = (schemeId, lineId) => {
  return [ES, IMPS].includes(schemeId) ? '' : lineId
}

module.exports = {
  getLineId
}
