const { ES, FC, IMPS } = require('../../constants/scheme-ids')

const getDueDate = (schemeId, dueDate) => {
  return [ES, FC, IMPS].includes(schemeId) ? '' : dueDate
}

module.exports = {
  getDueDate
}
