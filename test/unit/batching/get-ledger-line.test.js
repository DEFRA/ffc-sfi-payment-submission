const { GBP } = require('../../../app/constants/currency')
const { SFI, SFIP, LumpSums, VetVisits, CS, BPS } = require('../../../app/constants/schemes')

const { getLedgerLineAP } = require('../../../app/batching/get-ledger-line')

let invoiceLine
let paymentRequest
let lineId
let source

describe('getLedgerLineAP tests', () => {
  beforeEach(() => {
    invoiceLine = {
      accountCode: 'SOS270',
      description: 'G00 - Gross value of payment',
      fundCode: 'DRD10',
      schemeCode: '80001',
      value: '100.00'

    }
    paymentRequest = {
      marketingYear: '2023',
      deliveryBody: 'RP00',
      currency: GBP,
      schemeId: SFI
    }

    lineId = ''
    source = ''
  })

  test('Should return substring of invoiceLine.description when schemeId is BPS', async () => {
    paymentRequest.schemeId = BPS
    const result = await getLedgerLineAP(invoiceLine, paymentRequest, lineId, source)
    expect(result[17]).toBe('Gross value of payment')
  })

  test('Should not return substring of invoiceLine.description when schemeId is SFI', async () => {
    paymentRequest.schemeId = SFI
    const result = await getLedgerLineAP(invoiceLine, paymentRequest, lineId, source)
    expect(result[17]).toBe('G00 - Gross value of payment')
  })

  test('Should not return substring of invoiceLine.description when schemeId is SFIP', async () => {
    paymentRequest.schemeId = SFIP
    const result = await getLedgerLineAP(invoiceLine, paymentRequest, lineId, source)
    expect(result[17]).toBe('G00 - Gross value of payment')
  })

  test('Should not return substring of invoiceLine.description when schemeId is LumpSums', async () => {
    paymentRequest.schemeId = LumpSums
    const result = await getLedgerLineAP(invoiceLine, paymentRequest, lineId, source)
    expect(result[17]).toBe('G00 - Gross value of payment')
  })

  test('Should not return substring of invoiceLine.description when schemeId is VetVisits', async () => {
    paymentRequest.schemeId = VetVisits
    const result = await getLedgerLineAP(invoiceLine, paymentRequest, lineId, source)
    expect(result[17]).toBe('G00 - Gross value of payment')
  })

  test('Should not return substring of invoiceLine.description when schemeId is CS', async () => {
    paymentRequest.schemeId = CS
    const result = await getLedgerLineAP(invoiceLine, paymentRequest, lineId, source)
    expect(result[17]).toBe('G00 - Gross value of payment')
  })
})

// SFI, SFIP, LumpSums, VetVisits, CS, BPS
