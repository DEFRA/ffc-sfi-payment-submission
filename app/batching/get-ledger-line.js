const { convertToPounds } = require('../currency-convert')

const getLedgerLineAP = (invoiceLine, paymentRequest, lineId) => {
  return [
    'Ledger',
    invoiceLine.accountCode,
    '',
    invoiceLine.fundCode,
    invoiceLine.schemeCode,
    paymentRequest.marketingYear,
    paymentRequest.deliveryBody,
    paymentRequest.invoiceNumber,
    convertToPounds(invoiceLine.value),
    paymentRequest.currency,
    'legacy',
    '',
    '',
    '',
    lineId,
    '',
    '',
    invoiceLine.description,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    paymentRequest.agreementNumber,
    '',
    'END'
  ]
}

const getLedgerLineAR = (invoiceLine, paymentRequest, lineId) => {
  return [
    'L',
    invoiceLine.description,
    invoiceLine.accountCode,
    convertToPounds(invoiceLine.value),
    '',
    paymentRequest.dueDate,
    paymentRequest.recoveryDate,
    '',
    '',
    invoiceLine.fundCode,
    invoiceLine.schemeCode,
    paymentRequest.marketingYear,
    paymentRequest.deliveryBody,
    '',
    'END'
  ]
}

module.exports = {
  getLedgerLineAP,
  getLedgerLineAR
}
