const { ES } = require('../../constants/schemes')

const getBatchNumber = (schemeId, sequence) => {
  if (schemeId === ES) {
    return ''
  }
  return sequence.toString().padStart(4, '0')
}

module.exports = {
  getBatchNumber
}
