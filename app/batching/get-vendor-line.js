const { BPS, FDMR } = require('../constants/schemes')
const { EUR } = require('../constants/currency')
const { convertToPounds } = require('../currency-convert')
const { setPaymentType } = require('./vendor-lines/set-payment-type')
const { getSource } = require('./vendor-lines/get-source')
const { NOT_APPLICABLE } = require('../constants/not-applicable')
const AGREEMENT_NUMBER_INDEX = 28

const getVendorLineAP = (paymentRequest, batch, highestValueLine) => {
  const line = [
    'Vendor',
    paymentRequest.frn,
    '',
    highestValueLine.fundCode,
    highestValueLine.schemeCode,
    paymentRequest.marketingYear ?? NOT_APPLICABLE,
    paymentRequest.deliveryBody,
    paymentRequest.invoiceNumber,
    convertToPounds((paymentRequest.value * -1)),
    paymentRequest.currency,
    'legacy',
    '',
    paymentRequest.contractNumber,
    setPaymentType(paymentRequest.schemeId, paymentRequest.paymentType),
    '',
    (paymentRequest.schemeId === BPS || paymentRequest.schemeId === FDMR) ? '' : 1,
    '',
    '',
    '',
    `BACS_${paymentRequest.currency}`,
    getSource(paymentRequest.schemeId, batch.scheme.batchProperties.source, paymentRequest.pillar),
    paymentRequest.exchangeRate ?? '',
    batch.sequence.toString().padStart(4, '0'),
    '',
    paymentRequest.dueDate,
    paymentRequest.schemeId === BPS ? EUR : paymentRequest.currency,
    '',
    '',
    paymentRequest.schedule,
    'END'
  ]

  if (!paymentRequest.schedule) {
    line.splice(AGREEMENT_NUMBER_INDEX, 1)
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
    paymentRequest.marketingYear ?? NOT_APPLICABLE,
    paymentRequest.deliveryBody,
    'END'
  ]
}

module.exports = {
  getVendorLineAP,
  getVendorLineAR
}
