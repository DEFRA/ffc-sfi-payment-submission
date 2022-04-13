const db = require('../data')

const getExistingPaymentRequest = async (invoiceNumber, referenceId, transaction) => {
  const where = referenceId ? { referenceId } : { invoiceNumber }

  return db.paymentRequest.findOne({
    lock: true,
    where
  }, { transaction })
}

module.exports = getExistingPaymentRequest
