const { BPS, FDMR, ES, FC, IMPS } = require('../../constants/schemes')

const getPaymentDescription = (schemeId) => {
  switch (schemeId) {
    case BPS:
    case FDMR:
    case ES:
    case FC:
      return ''
    case IMPS:
      return 'PAY'
    default:
      return 1
  }
}

module.exports = {
  getPaymentDescription
}
