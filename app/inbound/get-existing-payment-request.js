const db = require('../data')

const getExistingPaymentRequest = async (invoiceNumber, referenceId, transaction) => {
  const where = referenceId ? { referenceId } : { invoiceNumber }

  return db.paymentRequest.findOne({
    transaction,
    where
  })
}

module.exports = getExistingPaymentRequest
