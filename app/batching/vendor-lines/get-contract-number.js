const { ES } = require('../../constants/scheme-ids')

const getContractNumber = (schemeId, contractNumber, invoiceNumber) => {
  if (schemeId === ES) {
    return invoiceNumber.substring(invoiceNumber.indexOf('(') + 1, invoiceNumber.indexOf(')'))
  }
  return contractNumber
}

module.exports = {
  getContractNumber
}
