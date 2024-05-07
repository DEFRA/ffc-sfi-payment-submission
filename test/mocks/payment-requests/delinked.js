const { Delinked } = require('../../../app/constants/schemes')
const { DELINKED_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

module.exports = {
  ...paymentRequest,
  schemeId: Delinked,
  invoiceNumber: DELINKED_INVOICE_NUMBER
}
