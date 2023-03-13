const { getLedgerLineAP, getLedgerLineAR } = require('./get-ledger-line')
const { getVendorLineAP, getVendorLineAR } = require('./get-vendor-line')
const { AP } = require('../constants/ledgers')

const getContent = (batch) => {
  let rows = []
  for (const paymentRequest of batch.paymentRequests) {
    const content = batch.ledger === AP ? getAPContent(paymentRequest, batch) : getARContent(paymentRequest, batch)
    rows = rows.concat(content)
  }
  return rows
}

const getAPContent = (paymentRequest, batch) => {
  const highestValueLine = getHighestValueLine(paymentRequest.invoiceLines)
  const rows = []
  rows.push(getVendorLineAP(paymentRequest, batch, highestValueLine))
  for (const [lineId, invoiceLine] of paymentRequest.invoiceLines.entries()) {
    rows.push(getLedgerLineAP(invoiceLine, paymentRequest, lineId + 1, batch.scheme.batchProperties.source))
  }
  return rows
}

const getARContent = (paymentRequest, batch) => {
  const valueLine = paymentRequest.value > 0 ? getHighestValueLine(paymentRequest.invoiceLines) : getLowestValueLine(paymentRequest.invoiceLines)
  const rows = []
  rows.push(getVendorLineAR(paymentRequest, batch, valueLine))
  for (const [lineId, invoiceLine] of paymentRequest.invoiceLines.entries()) {
    rows.push(getLedgerLineAR(invoiceLine, paymentRequest, lineId + 1, batch.scheme.batchProperties.source))
  }
  return rows
}

const getHighestValueLine = (invoiceLines) => {
  return invoiceLines.reduce((prev, current) => (prev.value > current.value) ? prev : current)
}

const getLowestValueLine = (invoiceLines) => {
  return invoiceLines.reduce((prev, current) => (prev.value < current.value) ? prev : current)
}

module.exports = getContent
