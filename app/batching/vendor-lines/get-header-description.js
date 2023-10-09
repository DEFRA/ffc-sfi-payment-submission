const { FC } = require('../../constants/scheme-ids')

const getHeaderDescription = (paymentRequest) => {
  if (paymentRequest.schemeId === FC) {
    return paymentRequest.invoiceLines?.[0]?.description || ''
  }
  return ''
}

module.exports = {
  getHeaderDescription
}
