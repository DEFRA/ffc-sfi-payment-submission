const { DefaultAzureCredential } = require('@azure/identity')
const { BlobServiceClient } = require('@azure/storage-blob')
const config = require('./config').storageConfig
let blobServiceClient
let containersInitialised

if (config.useConnectionStr) {
  console.log('Using connection string for BlobServiceClient')
  blobServiceClient = BlobServiceClient.fromConnectionString(config.connectionStr)
} else {
  console.log('Using DefaultAzureCredential for BlobServiceClient')
  const uri = `https://${config.storageAccount}.blob.core.windows.net`
  blobServiceClient = new BlobServiceClient(uri, new DefaultAzureCredential())
}

const outboundContainer = blobServiceClient.getContainerClient(config.outboundContainer)

const initialiseContainers = async () => {
  console.log('Making sure blob containers exist')
  await outboundContainer.createIfNotExists()
  containersInitialised = true
}

const getOutboundBlobClient = async (filename) => {
  containersInitialised ?? await initialiseContainers()
  return outboundContainer.getBlockBlobClient(filename)
}

module.exports = {
  blobServiceClient,
  getOutboundBlobClient
}
