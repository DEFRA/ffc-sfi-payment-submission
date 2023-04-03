const { BPS, CS, FDMR } = require('../../constants/schemes')

const setPaymentType = (schemeId, paymentType) => {
  switch (true) {
    case (schemeId === CS && paymentType === '1'):
      return 1
    case schemeId === BPS:
    case schemeId === FDMR:
      return ''
    default:
      return 0
  }
}

module.exports = setPaymentType
