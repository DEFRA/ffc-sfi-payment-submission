const { getLedgerLineAP } = require('../../../app/batching/get-ledger-line')

let invoiceLine
let sfiPaymentRequest
let sfiPilotPaymentRequest
let lumpSumsPaymentRequest
let vetVisitsPaymentRequest
let csPaymentRequest
let bpsPaymentRequest
let fdmrPaymentRequest
let lineId
let source

describe('getLedgerLineAP tests', () => {
  beforeEach(() => {
    invoiceLine = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/invoice-line')))

    sfiPaymentRequest = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/sfi')))
    sfiPilotPaymentRequest = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/sfi-pilot')))
    lumpSumsPaymentRequest = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/lump-sums')))
    vetVisitsPaymentRequest = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/vet-visits')))
    csPaymentRequest = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/cs')))
    bpsPaymentRequest = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/bps')))
    fdmrPaymentRequest = JSON.parse(JSON.stringify(require('../../mocks/payment-requests/fdmr')))

    lineId = ''
    source = ''
  })

  test('Should return substring of invoiceLine.description when schemeId is BPS', async () => {
    const result = await getLedgerLineAP(invoiceLine, bpsPaymentRequest, lineId, source)
    expect(result[17]).toBe('Gross value of claim')
  })

  test('Should return substring of invoiceLine.description when schemeId is FDMR', async () => {
    const result = await getLedgerLineAP(invoiceLine, fdmrPaymentRequest, lineId, source)
    expect(result[17]).toBe('Gross value of claim')
  })

  test('Should not return substring of invoiceLine.description when schemeId is SFI', async () => {
    const result = await getLedgerLineAP(invoiceLine, sfiPaymentRequest, lineId, source)
    expect(result[17]).toBe('G00 - Gross value of claim')
  })

  test('Should not return substring of invoiceLine.description when schemeId is SFIP', async () => {
    const result = await getLedgerLineAP(invoiceLine, sfiPilotPaymentRequest, lineId, source)
    expect(result[17]).toBe('G00 - Gross value of claim')
  })

  test('Should not return substring of invoiceLine.description when schemeId is LumpSums', async () => {
    const result = await getLedgerLineAP(invoiceLine, lumpSumsPaymentRequest, lineId, source)
    expect(result[17]).toBe('G00 - Gross value of claim')
  })

  test('Should not return substring of invoiceLine.description when schemeId is VetVisits', async () => {
    const result = await getLedgerLineAP(invoiceLine, vetVisitsPaymentRequest, lineId, source)
    expect(result[17]).toBe('G00 - Gross value of claim')
  })

  test('Should not return substring of invoiceLine.description when schemeId is CS', async () => {
    const result = await getLedgerLineAP(invoiceLine, csPaymentRequest, lineId, source)
    expect(result[17]).toBe('G00 - Gross value of claim')
  })
})
