const { MessageSender } = require('ffc-messaging')
const createMessage = require('./create-message')
const { sendTopic } = require('../config')

async function sendFileTransferMessage (filename, target) {
  const message = createMessage(filename, target)
  const sender = new MessageSender(sendTopic)
  await sender.sendMessage(message)
  await sender.closeConnection()
}

module.exports = sendFileTransferMessage
