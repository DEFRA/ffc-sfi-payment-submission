const { NOT_APPLICABLE } = require('../constants/not-applicable')
const { BPS, FDMR } = require('../constants/schemes')
const { convertToPounds } = require('../currency-convert')
const { getAgreementReference } = require('./get-agreement-reference')
const { getCustomerReference } = require('./get-customer-reference')
const AGREEMENT_NUMBER_INDEX = 28

const getLedgerLineAP = (invoiceLine, paymentRequest, lineId, source) => {
  const line = [
    'Ledger',
    invoiceLine.accountCode,
    '',
    invoiceLine.fundCode,
    invoiceLine.schemeCode,
    invoiceLine.marketingYear ?? paymentRequest.marketingYear ?? NOT_APPLICABLE,
    invoiceLine.deliveryBody ?? paymentRequest.deliveryBody,
    paymentRequest.invoiceNumber,
    convertToPounds(invoiceLine.value),
    paymentRequest.currency,
    getCustomerReference(paymentRequest),
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
    invoiceLine.marketingYear ?? paymentRequest.marketingYear ?? NOT_APPLICABLE,
    invoiceLine.deliveryBody ?? paymentRequest.deliveryBody,
    getAgreementReference(source, invoiceLine.agreementNumber ?? paymentRequest.agreementNumber),
    'END'
  ]
}

module.exports = {
  getLedgerLineAP,
  getLedgerLineAR
}
