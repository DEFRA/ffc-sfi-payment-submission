const { SFIExpanded } = require('../../../app/constants/schemes')
const { SFI_EXPANDED_INVOICE_NUMBER } = require('../values/invoice-number')
const paymentRequest = require('./payment-request')

module.exports = {
  ...paymentRequest,
  schemeId: SFIExpanded,
  invoiceNumber: SFI_EXPANDED_INVOICE_NUMBER
}
