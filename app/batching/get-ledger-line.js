const { convertToPounds } = require('../currency-convert')

const getLedgerLineAP = (invoiceLine, paymentRequest, lineId, source) => {
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
    getAgreementReference(source, paymentRequest.agreementNumber),
    '',
    'END'
  ]

  if (!paymentRequest.schedule) {
    line.splice(28, 1)
  }

  return line
}

const getLedgerLineAR = (invoiceLine, paymentRequest, lineId, source) => {
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
    getAgreementReference(source, paymentRequest.agreementNumber),
    'END'
  ]
}

const getAgreementReference = (source, agreementNumber) => {
  // With the exception of SitiELM and SITICS, for sources beginning with Siti, DAX will populate the remittance advice with an invalid reference
  // This can be avoided by not passing the agreement number on ledger lines
  return !source.toLowerCase().startsWith('siti') || source === 'SitiELM' || source === 'SITICS' ? agreementNumber : ''
}

module.exports = {
  getLedgerLineAP,
  getLedgerLineAR
}
