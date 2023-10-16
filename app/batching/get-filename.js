const moment = require('moment')
const { getPrefixAndSuffix } = require('./get-prefix-and-suffix')

const getFileName = (batch) => {
  const [prefix, suffix] = getPrefixAndSuffix(batch.schemeId)
  return `${prefix}_${batch.sequence.toString().padStart(4, '0')}_${batch.ledger}_${moment().format('YYYYMMDDHHmmss')}${suffix}.csv`
}

module.exports = getFileName
