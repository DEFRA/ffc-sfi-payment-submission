const joi = require('joi')
const { PRODUCTION } = require('../constants/environments')

const schema = joi.object({
  messageQueue: {
    host: joi.string(),
    username: joi.string(),
    password: joi.string(),
    useCredentialChain: joi.bool().default(false),
    type: joi.string().default('subscription'),
    appInsights: joi.object()
  },
  submitSubscription: {
    address: joi.string(),
    topic: joi.string(),
    numberOfReceivers: joi.number().default(3)
  },
  sendTopic: {
    address: joi.string()
  },
  eventTopic: {
    address: joi.string()
  },
  eventsTopic: {
    address: joi.string()
  }
})
const config = {
  messageQueue: {
    host: process.env.MESSAGE_QUEUE_HOST,
    username: process.env.MESSAGE_QUEUE_USER,
    password: process.env.MESSAGE_QUEUE_PASSWORD,
    useCredentialChain: process.env.NODE_ENV === PRODUCTION,
    type: 'subscription',
    appInsights: process.env.NODE_ENV === PRODUCTION ? require('applicationinsights') : undefined
  },
  submitSubscription: {
    address: process.env.PAYMENTSUBMIT_SUBSCRIPTION_ADDRESS,
    topic: process.env.PAYMENTSUBMIT_TOPIC_ADDRESS,
    numberOfReceivers: process.env.PAYMENTSUBMIT_SUBSCRIPTION_RECEIVERS
  },
  sendTopic: {
    address: process.env.FILESEND_TOPIC_ADDRESS
  },
  eventTopic: {
    address: process.env.EVENT_TOPIC_ADDRESS
  },
  eventsTopic: {
    address: process.env.EVENTS_TOPIC_ADDRESS
  }
}

const result = schema.validate(config, {
  abortEarly: false
})

// Throw if config is invalid
if (result.error) {
  throw new Error(`The message queue config is invalid. ${result.error.message}`)
}

const submitSubscription = { ...result.value.messageQueue, ...result.value.submitSubscription }
const sendTopic = { ...result.value.messageQueue, ...result.value.sendTopic }
const eventTopic = { ...result.value.messageQueue, ...result.value.eventTopic }
const eventsTopic = { ...result.value.messageQueue, ...result.value.eventsTopic }

module.exports = {
  submitSubscription,
  sendTopic,
  eventTopic,
  eventsTopic
}
