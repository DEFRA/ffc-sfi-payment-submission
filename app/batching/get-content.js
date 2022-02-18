const { getLedgerLineAP, getLedgerLineAR } = require('./get-ledger-line')
const { getVendorLineAP, getVendorLineAR } = require('./get-vendor-line')
const { AP } = require('../ledgers')

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
    rows.push(getLedgerLineAP(invoiceLine, paymentRequest, lineId + 1))
  }
  return rows
}

const getARContent = (paymentRequest, batch) => {
  const rows = []
  const vendorGroups = getVendorGroups(paymentRequest.invoiceLines)
  for (const vendorGroup of vendorGroups) {
    rows.push(getVendorLineAR(paymentRequest, vendorGroup, batch))
    for (const [lineId, invoiceLine] of vendorGroup.invoiceLines.entries()) {
      rows.push(getLedgerLineAR(invoiceLine, paymentRequest, lineId + 1))
    }
  }
  return rows
}

const getHighestValueLine = (invoiceLines) => {
  return invoiceLines.reduce((prev, current) => (+prev.value > +current.value) ? prev : current)
}

const getVendorGroups = (invoiceLines) => {
  return [...invoiceLines.reduce((x, y) => {
    // group by scheme and fund, so create key representing the combination
    const key = `${y.schemeCode}-${y.fundCode}`

    // if key doesn't exist then first instance so create new group
    const item = x.get(key) || Object.assign({}, { fundCode: y.fundCode, schemeCode: y.schemeCode, value: 0, invoiceLines: [] })
    item.value += Number(y.value)
    item.invoiceLines.push(y)

    return x.set(key, item)
  }, new Map()).values()]
}

module.exports = getContent
