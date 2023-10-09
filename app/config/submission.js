const Joi = require('joi')
const { DEVELOPMENT, TEST, PRODUCTION } = require('../constants/environments')

// Define config schema
const schema = Joi.object({
  env: Joi.string().valid(DEVELOPMENT, TEST, PRODUCTION).default(DEVELOPMENT),
  batchGenerationInterval: Joi.number().default(30000), // 30 seconds
  batchSize: Joi.number().default(10000),
  batchCap: Joi.number().default(1),
  useV2Events: Joi.boolean().default(true)
})

// Build config
const config = {
  env: process.env.NODE_ENV,
  batchGenerationInterval: process.env.BATCH_INTERVAL,
  batchSize: process.env.BATCH_SIZE,
  batchCap: process.env.BATCH_CAP,
  useV2Events: process.env.USE_V2_EVENTS
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The server config is invalid. ${result.error.message}`)
}

// Use the Joi validated value
module.exports = result.value