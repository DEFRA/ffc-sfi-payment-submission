const { GBP } = require('../../../app/constants/currency')
const { AP } = require('../../../app/constants/ledgers')
const { M12 } = require('../../../app/constants/schedules')
const { SFI } = require('../../../app/constants/schemes')
const { AGREEMENT_NUMBER } = require('../values/agreement-number')
const { BATCH } = require('../values/batch')
const { CONTRACT_NUMBER } = require('../values/contract-number')
const { CORRELATION_ID } = require('../values/correlation-id')
const { DELIVERY_BODY_RPA } = require('../values/delivery-body')
const { PENALTY_DESCRIPTION } = require('../values/description')
const { DUE_DATE_DAX } = require('../values/due-date')
const { FRN } = require('../values/frn')
const { SFI_INVOICE_NUMBER } = require('../values/invoice-number')
const { MARKETING_YEAR } = require('../values/marketing-year')
const { PAYMENT_REQUEST_NUMBER } = require('../values/payment-request-number')
const { SBI } = require('../values/sbi')
const { SOURCE_SYSTEM } = require('../values/source-system')
const invoiceLine = require('./invoice-line')

module.exports = {
  correlationId: CORRELATION_ID,
  schemeId: SFI,
  sourceSystem: SOURCE_SYSTEM,
  batch: BATCH,
  deliveryBody: DELIVERY_BODY_RPA,
  invoiceNumber: SFI_INVOICE_NUMBER,
  frn: FRN,
  sbi: SBI,
  paymentRequestNumber: PAYMENT_REQUEST_NUMBER,
  agreementNumber: AGREEMENT_NUMBER,
  contractNumber: CONTRACT_NUMBER,
  marketingYear: MARKETING_YEAR,
  currency: GBP,
  schedule: M12,
  dueDate: DUE_DATE_DAX,
  value: 150.00,
  ledger: AP,
  invoiceLines: [{
    ...invoiceLine,
    value: 250.00
  }, {
    ...invoiceLine,
    description: PENALTY_DESCRIPTION,
    value: -100.00
  }]
}
