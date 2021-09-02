const { getOutboundBlobClient } = require('../storage')
const { writeToString } = require('@fast-csv/format')

const publishBatch = async (filename, content) => {
  const body = await writeToString(content)
  const outboundBlobClient = await getOutboundBlobClient(filename)
  await outboundBlobClient.upload(body, body.length)
  console.info(`Published ${filename}`)
}

module.exports = publishBatch
