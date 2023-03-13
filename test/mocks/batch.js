const { AP } = require('../../app/constants/ledgers')
const paymentRequest = require('./payment-request')

module.exports = {
  batchId: 1,
  schemeId: 1,
  ledger: AP,
  paymentRequests: [paymentRequest, paymentRequest]
}
