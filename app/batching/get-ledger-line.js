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
  return getLedgerLineAP(invoiceLine, paymentRequest, lineId)
}

module.exports = {
  getLedgerLineAP,
  getLedgerLineAR
}
