function createMessage (filename, target) {
  return {
    body: {
      filename,
      target
    },
    type: 'uk.gov.pay.file.send',
    source: 'ffc-pay-submission'
  }
}

module.exports = createMessage
