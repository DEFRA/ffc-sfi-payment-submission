const { SFI_PILOT } = require('../../../app/constants/scheme-ids')
const { SFI_PILOT_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

module.exports = {
  ...paymentRequest,
  schemeId: SFI_PILOT,
  invoiceNumber: SFI_PILOT_INVOICE_NUMBER
}
