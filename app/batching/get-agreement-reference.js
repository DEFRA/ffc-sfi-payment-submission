const { CS, ES, FC, IMPS } = require("../constants/scheme-sources")

const getAgreementReference = (source, agreementNumber) => {
  // With the exception of SitiELM and SITICS, for sources beginning with Siti, DAX will populate the remittance advice with an invalid reference
  // This can be avoided by not passing the agreement number on ledger lines
  if (source === 'SitiELM' || source === CS) {
    return agreementNumber
  }
  if (source.toLowerCase().startsWith('siti') || source === ES || source === FC || source === IMPS) {
    return ''
  }
  return agreementNumber
}

module.exports = {
  getAgreementReference
}
