const { NOT_APPLICABLE } = require('../../../app/constants/not-applicable')

const { getLedgerLineAP, getLedgerLineAR } = require('../../../app/batching/get-ledger-line')

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

describe('get ledger line for AP', () => {
  test('should return marketing year from invoice line when present', () => {
    const result = getLedgerLineAP(invoiceLine, sfiPaymentRequest, lineId, source)
    expect(result[5]).toBe(invoiceLine.marketingYear)
  })

  test('should return marketing year from payment request when not present on invoice line', () => {
    delete invoiceLine.marketingYear
    const result = getLedgerLineAP(invoiceLine, sfiPaymentRequest, lineId, source)
    expect(result[5]).toBe(sfiPaymentRequest.marketingYear)
  })

  test('should return marketing year from payment request when not present on invoice line or payment request', () => {
    delete invoiceLine.marketingYear
    delete sfiPaymentRequest.marketingYear
    const result = getLedgerLineAP(invoiceLine, sfiPaymentRequest, lineId, source)
    expect(result[5]).toBe(NOT_APPLICABLE)
  })

  test('should return substring of invoiceLine.description when schemeId is BPS', () => {
    const result = getLedgerLineAP(invoiceLine, bpsPaymentRequest, lineId, source)
    expect(result[17]).toBe('Gross value of claim')
  })

  test('should return substring of invoiceLine.description when schemeId is FDMR', () => {
    const result = getLedgerLineAP(invoiceLine, fdmrPaymentRequest, lineId, source)
    expect(result[17]).toBe('Gross value of claim')
  })

  test('should not return substring of invoiceLine.description when schemeId is SFI', () => {
    const result = getLedgerLineAP(invoiceLine, sfiPaymentRequest, lineId, source)
    expect(result[17]).toBe('G00 - Gross value of claim')
  })

  test('should not return substring of invoiceLine.description when schemeId is SFIP', () => {
    const result = getLedgerLineAP(invoiceLine, sfiPilotPaymentRequest, lineId, source)
    expect(result[17]).toBe('G00 - Gross value of claim')
  })

  test('should not return substring of invoiceLine.description when schemeId is LumpSums', () => {
    const result = getLedgerLineAP(invoiceLine, lumpSumsPaymentRequest, lineId, source)
    expect(result[17]).toBe('G00 - Gross value of claim')
  })

  test('should not return substring of invoiceLine.description when schemeId is VetVisits', () => {
    const result = getLedgerLineAP(invoiceLine, vetVisitsPaymentRequest, lineId, source)
    expect(result[17]).toBe('G00 - Gross value of claim')
  })

  test('should not return substring of invoiceLine.description when schemeId is CS', () => {
    const result = getLedgerLineAP(invoiceLine, csPaymentRequest, lineId, source)
    expect(result[17]).toBe('G00 - Gross value of claim')
  })

  test('should return invoice line agreement number if exists when CS and AP', () => {
    const result = getLedgerLineAP(invoiceLine, csPaymentRequest, lineId, source)
    expect(result[27]).toBe(invoiceLine.agreementNumber)
  })

  test('should return payment request agreement number if invoice line agreement number does not exist and when CS and AP', () => {
    delete invoiceLine.agreementNumber
    const result = getLedgerLineAP(invoiceLine, csPaymentRequest, lineId, source)
    expect(result[27]).toBe(csPaymentRequest.agreementNumber)
  })

  test('should not use either if source starts with SITI and not SITIELM or SITICS when AP', () => {
    source = 'SITI'
    const result = getLedgerLineAP(invoiceLine, csPaymentRequest, lineId, source)
    expect(result[27]).toBe('')
  })

  test('should return invoice line agreement number if exists when CS and AR', () => {
    const result = getLedgerLineAR(invoiceLine, csPaymentRequest, lineId, source)
    expect(result[13]).toBe(invoiceLine.agreementNumber)
  })

  test('should return payment request agreement number if invoice line agreement number does not exist and when CS and AR', () => {
    delete invoiceLine.agreementNumber
    const result = getLedgerLineAR(invoiceLine, csPaymentRequest, lineId, source)
    expect(result[13]).toBe(csPaymentRequest.agreementNumber)
  })

  test('should not use either if source starts with SITI and not SITIELM or SITICS when AR', () => {
    source = 'SITI'
    const result = getLedgerLineAR(invoiceLine, csPaymentRequest, lineId, source)
    expect(result[13]).toBe('')
  })
})

describe('get ledger line for AR', () => {
  test('should return marketing year from invoice line when present', () => {
    const result = getLedgerLineAR(invoiceLine, sfiPaymentRequest, lineId, source)
    expect(result[11]).toBe(invoiceLine.marketingYear)
  })

  test('should return marketing year from payment request when not present on invoice line', () => {
    delete invoiceLine.marketingYear
    const result = getLedgerLineAR(invoiceLine, sfiPaymentRequest, lineId, source)
    expect(result[11]).toBe(sfiPaymentRequest.marketingYear)
  })

  test('should return not applicable marketing year when marketing year not present on invoice line or payment request', () => {
    delete sfiPaymentRequest.marketingYear
    delete invoiceLine.marketingYear
    const result = getLedgerLineAR(invoiceLine, sfiPaymentRequest, lineId, source)
    expect(result[11]).toBe(NOT_APPLICABLE)
  })
})
