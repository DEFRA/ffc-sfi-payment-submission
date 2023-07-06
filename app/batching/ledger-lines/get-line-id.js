const { ES, FC, IMPS } = require('../../constants/schemes')

const getLineId = (schemeId, lineId) => {
  return [ES, FC, IMPS].includes(schemeId) ? '' : lineId
}

module.exports = {
  getLineId
}
