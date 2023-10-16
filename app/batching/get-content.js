const { AP } = require('../constants/ledgers')
const batchProperties = require('../constants/batch-properties')
const { getLedgerLineAP, getLedgerLineAR } = require('./ledger-lines/get-ledger-line')
const { getVendorLineAP, getVendorLineAR } = require('./vendor-lines/get-vendor-line')

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
  const source = getSchemeSource(batch.schemeId)
  rows.push(getVendorLineAP(paymentRequest, batch, source, highestValueLine))
  for (const [lineId, invoiceLine] of paymentRequest.invoiceLines.entries()) {
    rows.push(getLedgerLineAP(invoiceLine, paymentRequest, lineId + 1, source))
  }
  return rows
}

const getARContent = (paymentRequest, batch) => {
  const valueLine = paymentRequest.value > 0 ? getHighestValueLine(paymentRequest.invoiceLines) : getLowestValueLine(paymentRequest.invoiceLines)
  const rows = []
  const source = getSchemeSource(batch.schemeId)
  rows.push(getVendorLineAR(paymentRequest, batch, source, valueLine))
  for (const [lineId, invoiceLine] of paymentRequest.invoiceLines.entries()) {
    rows.push(getLedgerLineAR(invoiceLine, paymentRequest, lineId + 1, source))
  }
  return rows
}

const getSchemeSource = (schemeId) => {
  const sourceIdx = batchProperties.findIndex(scheme => scheme.schemeId === schemeId)
  return batchProperties[sourceIdx].source
}

const getHighestValueLine = (invoiceLines) => {
  return invoiceLines.reduce((prev, current) => (prev.value > current.value) ? prev : current)
}

const getLowestValueLine = (invoiceLines) => {
  return invoiceLines.reduce((prev, current) => (prev.value < current.value) ? prev : current)
}

module.exports = getContent
