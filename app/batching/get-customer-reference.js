const { ES, FC, IMPS } = require('../constants/scheme-ids')

const getCustomerReference = (paymentRequest) => {
  if (paymentRequest.schemeId === ES) {
    return paymentRequest.vendor
  }
  if (paymentRequest.schemeId === FC) {
    return paymentRequest.sbi
  }
  if (paymentRequest.schemeId === IMPS) {
    return paymentRequest.trader
  }
  return 'legacy'
}

module.exports = {
  getCustomerReference
}
