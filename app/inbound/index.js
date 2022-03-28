const db = require('../data')
const getExistingPaymentRequest = require('./get-existing-payment-request')
const saveInvoiceLines = require('./save-invoice-lines')

const savePaymentRequest = async (paymentRequest) => {
  const transaction = await db.sequelize.transaction()
  try {
    const existingPaymentRequest = await getExistingPaymentRequest(paymentRequest.invoiceNumber, paymentRequest.referenceId, transaction)
    if (existingPaymentRequest) {
      console.info(`Duplicate payment request received, skipping ${paymentRequest.invoiceNumber}`)
      await transaction.rollback()
    } else {
      delete paymentRequest.paymentRequestId
      const savedPaymentRequest = await db.paymentRequest.create(paymentRequest, { transaction })
      await saveInvoiceLines(paymentRequest.invoiceLines, savedPaymentRequest.paymentRequestId, transaction)
      await transaction.commit()
    }
  } catch (error) {
    await transaction.rollback()
    throw (error)
  }
}

module.exports = savePaymentRequest
