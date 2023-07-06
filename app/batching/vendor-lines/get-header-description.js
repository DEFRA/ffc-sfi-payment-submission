const { FC } = require('../../constants/schemes')

const getHeaderDescription = (paymentRequest) => {
  if (paymentRequest.schemeId === FC) {
    return paymentRequest.invoiceLines[0]?.description || ''
  }
  return ''
}

module.exports = {
  getHeaderDescription
}
