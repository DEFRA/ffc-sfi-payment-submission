const Joi = require('joi')

// Define config schema
const schema = Joi.object({
  connectionStr: Joi.string().when('useConnectionStr', { is: true, then: Joi.required(), otherwise: Joi.allow('').optional() }),
  storageAccount: Joi.string().required(),
  outboundContainer: Joi.string().default('ffc-sfi-payment-submission-outbound'),
  archiveContainer: Joi.string().default('ffc-sfi-payment-submission-archive'),
  quarantineContainer: Joi.string().default('ffc-sfi-payment-submission-quarantine'),
  useConnectionStr: Joi.boolean().default(false)
})

// Build config
const config = {
  connectionStr: process.env.AZURE_STORAGE_CONNECTION_STRING,
  storageAccount: process.env.AZURE_STORAGE_ACCOUNT_NAME,
  outboundContainer: process.env.AZURE_STORAGE_OUTBOUND,
  archiveContainer: process.env.AZURE_STORAGE_ARCHIVE,
  quarantineContainer: process.env.AZURE_STORAGE_QUARANTINE,
  useConnectionStr: process.env.AZURE_STORAGE_USE_CONNECTION_STRING === 'true'
}

// Validate config
const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The blob storage config is invalid. ${result.error.message}`)
}

module.exports = result.value
