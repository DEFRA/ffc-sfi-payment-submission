const { BPS, FDMR } = require('../constants/schemes')
const { convertToPounds } = require('../currency-convert')
const AGREEMENT_NUMBER_INDEX = 28

const getLedgerLineAP = (invoiceLine, paymentRequest, lineId, source) => {
  const line = [
    'Ledger',
    invoiceLine.accountCode,
    '',
    invoiceLine.fundCode,
    invoiceLine.schemeCode,
    paymentRequest.marketingYear,
    invoiceLine.deliveryBody ?? paymentRequest.deliveryBody,
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
    (paymentRequest.schemeId === BPS || paymentRequest.schemeId === FDMR) ? invoiceLine.description.substring(6) : invoiceLine.description,
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    getAgreementReference(source, invoiceLine.agreementNumber ?? paymentRequest.agreementNumber),
    '',
    'END'
  ]

  if (!paymentRequest.schedule) {
    line.splice(AGREEMENT_NUMBER_INDEX, 1)
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
    invoiceLine.deliveryBody ?? paymentRequest.deliveryBody,
    getAgreementReference(source, invoiceLine.agreementNumber ?? paymentRequest.agreementNumber),
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
