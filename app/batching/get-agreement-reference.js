const getAgreementReference = (source, agreementNumber) => {
  if (source === 'Genesis' || source === 'GLOS' || source === '04') {
    return ''
  }
  return agreementNumber
}

module.exports = {
  getAgreementReference
}
