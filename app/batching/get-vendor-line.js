const { convertToPounds } = require('../currency-convert')
const { getPaymentType } = require('./vendor-lines/get-payment-type')
const { getSource } = require('./vendor-lines/get-source')
const { NOT_APPLICABLE } = require('../constants/not-applicable')
const { getCustomerReference } = require('./get-customer-reference')
const { getPaymentDescription } = require('./vendor-lines/get-payment-description')
const { getCurrency } = require('./vendor-lines/get-currency')
const { getDueDate } = require('./vendor-lines/get-due-date')
const { getBatchNumber } = require('./vendor-lines/get-batch-number')
const { getContractNumber } = require('./vendor-lines/get-contract-number')
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
    getCustomerReference(paymentRequest),
    '',
    getContractNumber(paymentRequest.schemeId, paymentRequest.contractNumber, paymentRequest.invoiceNumber),
    getPaymentType(paymentRequest.schemeId, paymentRequest.paymentType),
    '',
    getPaymentDescription(paymentRequest.schemeId),
    '',
    '',
    '',
    `BACS_${paymentRequest.currency}`,
    getSource(paymentRequest.schemeId, batch.scheme.batchProperties.source, paymentRequest.pillar),
    paymentRequest.exchangeRate ?? '',
    getBatchNumber(paymentRequest.schemeId, batch.sequence),
    paymentRequest.eventDate ?? '',
    getDueDate(paymentRequest.schemeId, paymentRequest.dueDate),
    getCurrency(paymentRequest.schemeId, paymentRequest.currency),
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
