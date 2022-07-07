const { convertToPounds } = require('../currency-convert')

const getVendorLineAP = (paymentRequest, batch, highestValueLine) => {
  const line = [
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

  if (!paymentRequest.schedule) {
    line.splice(28, 1)
  }

  return line
}

const getVendorLineAR = (paymentRequest, batch, lowestValueLine) => {
  return [
    'H',
    paymentRequest.frn,
    '',
    paymentRequest.currency,
    'No',
    paymentRequest.originalInvoiceNumber,
    'None',
    '',
    batch.scheme.batchProperties.source,
    '',
    paymentRequest.invoiceNumber,
    paymentRequest.invoiceNumber,
    'No',
    '',
    '',
    '',
    '',
    lowestValueLine.fundCode,
    lowestValueLine.schemeCode,
    paymentRequest.marketingYear,
    paymentRequest.deliveryBody,
    'END'
  ]
}

module.exports = {
  getVendorLineAP,
  getVendorLineAR
}
