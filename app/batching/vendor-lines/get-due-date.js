const { ES, FC, IMPS } = require('../../constants/schemes')

const getDueDate = (schemeId, dueDate) => {
  return [ES, FC, IMPS].includes(schemeId) ? '' : dueDate
}

module.exports = {
  getDueDate
}
