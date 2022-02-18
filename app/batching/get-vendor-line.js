const { convertToPounds } = require('../currency-convert')

const getVendorLineAP = (paymentRequest, batch, highestValueLine) => {
  return [
    'Vendor',
    paymentRequest.frn,
    '',
    highestValueLine.fundCode,
    highestValueLine.schemeCode,
    paymentRequest.marketingYear,
    paymentRequest.deliveryBody,
    paymentRequest.invoiceNumber,
    convertToPounds((paymentRequest.value * -1)),
    paymentRequest.currency,
    'legacy',
    '',
    paymentRequest.contractNumber,
    0,
    '',
    1,
    '',
    '',
    '',
    `BACS_${paymentRequest.currency}`,
    batch.scheme.batchProperties.source,
    '',
    batch.sequence.toString().padStart(4, '0'),
    '',
    paymentRequest.dueDate,
    paymentRequest.currency,
    '',
    '',
    paymentRequest.schedule,
    'END'
  ]
}

const getVendorLineAR = (paymentRequest, vendorGroup, batch) => {
  return [
    'H',
    paymentRequest.frn,
    '',
    paymentRequest.currency,
    'No',
    paymentRequest.invoiceNumber,
    'None',
    '',
    batch.scheme.batchProperties.source,
    '',
    paymentRequest.originalInvoiceNumber,
    paymentRequest.invoiceCorrectionReference,
    'No',
    paymentRequest.frn,
    '',
    paymentRequest.currency,
    '',
    vendorGroup.fundCode,
    vendorGroup.schemeCode,
    paymentRequest.marketingYear,
    paymentRequest.deliveryBody,
    'END'
  ]
}

module.exports = {
  getVendorLineAP,
  getVendorLineAR
}
