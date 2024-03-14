const { EUR } = require('../../../../app/constants/currency')
const { AR } = require('../../../../app/constants/ledgers')
const { NOT_APPLICABLE } = require('../../../../app/constants/not-applicable')

const { getVendorLineAP, getVendorLineAR } = require('../../../../app/batching/vendor-lines/get-vendor-line')

let paymentRequest
let bpsPaymentRequest
let fdmrPaymentRequest
let batch
let highestValueLine
let lowestValueLine

beforeEach(() => {
  paymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/payment-request')))
  bpsPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/bps')))
  fdmrPaymentRequest = JSON.parse(JSON.stringify(require('../../../mocks/payment-requests/fdmr')))

  batch = {
    scheme: {
      batchProperties: {
        source: 'SFI'
      }
    },
    sequence: 1
  }
  highestValueLine = {
    fundCode: '1234',
    schemeCode: '5678'
  }
  lowestValueLine = {
    fundCode: '1234',
    schemeCode: '5678'
  }
})

describe('get AP vendor line', () => {
  test('should return an array of 30 elements if payment request has schedule', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line.length).toBe(30)
  })

  test('should return an array of 29 elements if payment request does not have schedule', () => {
    paymentRequest.schedule = null
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line.length).toBe(29)
  })

  test('should return item 1 as Vendor line', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[0]).toBe('Vendor')
  })

  test('should return item 2 as FRN', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[1]).toBe(paymentRequest.frn)
  })

  test('should return item 3 as empty string', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[2]).toBe('')
  })

  test('should return item 4 as fund code', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[3]).toBe(highestValueLine.fundCode)
  })

  test('should return item 5 as scheme code', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[4]).toBe(highestValueLine.schemeCode)
  })

  test('should return item 6 as marketing year', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[5]).toBe(paymentRequest.marketingYear)
  })

  test('should return item 6 as not applicable if payment request does not have marketing year', () => {
    delete paymentRequest.marketingYear
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[5]).toBe(NOT_APPLICABLE)
  })

  test('should return item 7 as delivery body', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[6]).toBe(paymentRequest.deliveryBody)
  })

  test('should return item 8 as invoice number', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[7]).toBe(paymentRequest.invoiceNumber)
  })

  test('should return item 9 as inverted value in pounds', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[8]).toBe('-1.50')
  })

  test('should return item 10 as currency', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[9]).toBe(paymentRequest.currency)
  })

  test('should return item 11 as legacy', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[10]).toBe('legacy')
  })

  test('should return item 12 as empty string', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[11]).toBe('')
  })

  test('should return item 13 as contract number', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[12]).toBe(paymentRequest.contractNumber)
  })

  test('should return item 14 as 0 if not BPS or FDMR', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[13]).toBe(0)
  })

  test('should return item 14 as empty string if BPS', () => {
    const line = getVendorLineAP(bpsPaymentRequest, batch, highestValueLine)
    expect(line[13]).toBe('')
  })

  test('should return item 14 as empty string if FDMR', () => {
    const line = getVendorLineAP(fdmrPaymentRequest, batch, highestValueLine)
    expect(line[13]).toBe('')
  })

  test('should return item 15 as empty string', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[14]).toBe('')
  })

  test('should return item 16 as 1 if not BPS or FDMR', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[15]).toBe(1)
  })

  test('should return item 16 as empty string if BPS', () => {
    const line = getVendorLineAP(bpsPaymentRequest, batch, highestValueLine)
    expect(line[15]).toBe('')
  })

  test('should return item 16 as empty string if FDMR', () => {
    const line = getVendorLineAP(fdmrPaymentRequest, batch, highestValueLine)
    expect(line[15]).toBe('')
  })

  test('should return item 17 as empty string', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[16]).toBe('')
  })

  test('should return item 18 as empty string', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[17]).toBe('')
  })

  test('should return item 19 as empty string', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[18]).toBe('')
  })

  test('should return item 20 as BACS currency', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[19]).toBe('BACS_GBP')
  })

  test('should return item 21 as source', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[20]).toBe(batch.scheme.batchProperties.source)
  })

  test('should return item 22 as empty string', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[21]).toBe('')
  })

  test('should return item 23 as padded sequence', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[22]).toBe('0001')
  })

  test('should return item 24 as empty string', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[23]).toBe('')
  })

  test('should return item 25 as due date', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[24]).toBe(paymentRequest.dueDate)
  })

  test('should return item 26 as payment request currency if not BPS', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[25]).toBe(paymentRequest.currency)
  })

  test('should return item 26 as EUR if BPS', () => {
    const line = getVendorLineAP(bpsPaymentRequest, batch, highestValueLine)
    expect(line[25]).toBe(EUR)
  })

  test('should return item 27 as empty string', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[26]).toBe('')
  })

  test('should return item 28 as empty string', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[27]).toBe('')
  })

  test('should return item 29 as schedule if schedule', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[28]).toBe(paymentRequest.schedule)
  })

  test('should return item 29 as END if no schedule', () => {
    paymentRequest.schedule = null
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[28]).toBe('END')
  })

  test('should return item 30 as END if schedule', () => {
    const line = getVendorLineAP(paymentRequest, batch, highestValueLine)
    expect(line[29]).toBe('END')
  })
})

describe('get AR vendor line', () => {
  beforeEach(() => {
    paymentRequest.ledger = AR
    paymentRequest.originalInvoiceNumber = 'S12345678C123456V001'
  })

  test('should return array of 22 items', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line.length).toBe(22)
  })

  test('should return item 1 as H', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[0]).toBe('H')
  })

  test('should return item 2 as FRN', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[1]).toBe(paymentRequest.frn)
  })

  test('should return item 3 as empty string', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[2]).toBe('')
  })

  test('should return item 4 as currency', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[3]).toBe(paymentRequest.currency)
  })

  test('should return item 5 as No', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[4]).toBe('No')
  })

  test('should return item 6 as original invoice number', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[5]).toBe(paymentRequest.originalInvoiceNumber)
  })

  test('should return item 7 as None', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[6]).toBe('None')
  })

  test('should return item 8 as empty string', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[7]).toBe('')
  })

  test('should return item 9 as source', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[8]).toBe(batch.scheme.batchProperties.source)
  })

  test('should return item 10 as empty string', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[9]).toBe('')
  })

  test('should return item 11 as invoice number', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[10]).toBe(paymentRequest.invoiceNumber)
  })

  test('should return item 12 as invoice number', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[11]).toBe(paymentRequest.invoiceNumber)
  })

  test('should return item 13 as No', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[12]).toBe('No')
  })

  test('should return item 14 as empty string if not BPS', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[13]).toBe('')
  })

  test('should return item 14 as FRN if BPS', () => {
    const line = getVendorLineAR(bpsPaymentRequest, batch, lowestValueLine)
    expect(line[13]).toBe(bpsPaymentRequest.frn)
  })

  test('should return item 15 as empty string', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[14]).toBe('')
  })

  test('should return item 16 as empty string if not BPS', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[15]).toBe('')
  })

  test('should return item 16 as EUR if BPS', () => {
    const line = getVendorLineAR(bpsPaymentRequest, batch, lowestValueLine)
    expect(line[15]).toBe(EUR)
  })

  test('should return item 17 as empty string', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[16]).toBe('')
  })

  test('should return item 18 as fund code', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[17]).toBe(lowestValueLine.fundCode)
  })

  test('should return item 19 as scheme code', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[18]).toBe(lowestValueLine.schemeCode)
  })

  test('should return item 20 as marketing year if payment request has marketing year', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[19]).toBe(paymentRequest.marketingYear)
  })

  test('should return item 20 as not applicable if payment request has no marketing year', () => {
    paymentRequest.marketingYear = null
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[19]).toBe(NOT_APPLICABLE)
  })

  test('should return item 21 as delivery body', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[20]).toBe(paymentRequest.deliveryBody)
  })

  test('should return item 22 as END', () => {
    const line = getVendorLineAR(paymentRequest, batch, lowestValueLine)
    expect(line[21]).toBe('END')
  })
})
