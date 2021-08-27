const { getOutboundBlobClient } = require('../storage')
const { writeToString } = require('@fast-csv/format')

const publishBatch = async (filename, content) => {
  const body = await stringifyContent(content)
  const outboundBlobClient = await getOutboundBlobClient(filename)
  await outboundBlobClient.upload(body, body.length)
  console.info(`Published ${filename}`)
}

const stringifyContent = async (content) => {
  return writeToString(content)
}

module.exports = publishBatch
