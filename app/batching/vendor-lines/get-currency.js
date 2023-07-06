const { BPS, ES, FC, IMPS } = require('../../constants/schemes')
const { EUR } = require('../../constants/currency')

const getCurrency = (schemeId, paymentRequestCurrency) => {
  switch (schemeId) {
    case BPS:
      return EUR
    case ES:
    case FC:
    case IMPS:
      return ''
    default:
      return paymentRequestCurrency
  }
}

module.exports = {
  getCurrency
}
