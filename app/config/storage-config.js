const Joi = require('joi')

// Define config schema
const schema = Joi.object({
  connectionStr: Joi.string().when('useConnectionStr', { is: true, then: Joi.required(), otherwise: Joi.allow('').optional() }),
  storageAccount: Joi.string().required(),
  container: Joi.string().default('dax'),
  folder: Joi.string().default('outbound'),
  useConnectionStr: Joi.boolean().default(false)
})

// Build config
const config = {
  connectionStr: process.env.AZURE_STORAGE_CONNECTION_STRING,
  storageAccount: process.env.AZURE_STORAGE_ACCOUNT_NAME,
  container: process.env.AZURE_STORAGE_CONTAINER,
  folder: process.env.AZURE_STORAGE_FOLDER,
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
