const paymentRequest = require('./payment-request')
const { CS } = require('../../../app/constants/schemes')
const { CS_INVOICE_NUMBER } = require('../values/invoice-number')

module.exports = {
  ...paymentRequest,
  schemeId: CS,
  invoiceNumber: CS_INVOICE_NUMBER
}
