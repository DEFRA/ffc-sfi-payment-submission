const { BPS } = require('../../../app/constants/scheme-ids')
const { BPS_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

module.exports = {
  ...paymentRequest,
  schemeId: BPS,
  invoiceNumber: BPS_INVOICE_NUMBER
}
