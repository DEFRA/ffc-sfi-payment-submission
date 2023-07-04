const { BPS, FDMR, ES, IMPS } = require('../../constants/schemes')

const getPaymentDescription = (schemeId) => {
  switch (schemeId) {
    case BPS:
    case FDMR:
    case ES:
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
