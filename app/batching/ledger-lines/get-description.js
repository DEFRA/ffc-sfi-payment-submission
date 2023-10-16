const { BPS, FDMR } = require('../../constants/scheme-ids')
const MAX_DESCRIPTION_LENGTH = 60

const getDescription = (schemeId, description) => {
  return (schemeId === BPS || schemeId === FDMR) ? description.substring(6) : description.substring(0, MAX_DESCRIPTION_LENGTH)
}

module.exports = {
  getDescription
}
