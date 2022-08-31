const { convertToPounds } = require('../currency-convert')
const { SFI } = require('../schemes')

const getLedgerLineAP = (invoiceLine, paymentRequest, lineId) => {
  const line = [
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
    paymentRequest.schemeId === SFI ? '' : paymentRequest.agreementNumber,
    '',
    'END'
  ]

  if (!paymentRequest.schedule) {
    line.splice(28, 1)
  }

  return line
}

const getLedgerLineAR = (invoiceLine, paymentRequest, lineId) => {
  return [
    'L',
    invoiceLine.description,
    invoiceLine.accountCode,
    convertToPounds((invoiceLine.value * -1)),
    '',
    paymentRequest.dueDate,
    paymentRequest.recoveryDate,
    '',
    lineId,
    invoiceLine.fundCode,
    invoiceLine.schemeCode,
    paymentRequest.marketingYear,
    paymentRequest.deliveryBody,
    paymentRequest.schemeId === SFI ? '' : paymentRequest.agreementNumber,
    'END'
  ]
}

module.exports = {
  getLedgerLineAP,
  getLedgerLineAR
}
