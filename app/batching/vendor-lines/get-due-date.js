const { ES, IMPS } = require('../../constants/schemes')

const getDueDate = (schemeId, dueDate) => {
  return [ES, IMPS].includes(schemeId) ? '' : dueDate
}

module.exports = {
  getDueDate
}
