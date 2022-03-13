function createMessage (filename, ledger) {
  return {
    body: {
      filename,
      ledger
    },
    type: 'uk.gov.pay.file.send',
    source: 'ffc-pay-submission'
  }
}

module.exports = createMessage
