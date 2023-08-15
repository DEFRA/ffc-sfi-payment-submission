const { SFI23 } = require('../../../app/constants/schemes')
const { SFI23_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

module.exports = {
  ...paymentRequest,
  schemeId: SFI23,
  invoiceNumber: SFI23_INVOICE_NUMBER
}
