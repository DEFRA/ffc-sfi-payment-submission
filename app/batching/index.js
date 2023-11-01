const generateBatches = require('./generate-batches')
const config = require('../config')

const start = async () => {
  try {
    console.log('Generating batches')
    await generateBatches()
    console.log('Finished generating batches')
  } catch (err) {
    console.error(err)
  } finally {
    console.log('Rescheduling')
    setTimeout(start, config.batchGenerationInterval)
  }
}

module.exports = {
  start
}
