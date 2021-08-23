require('./insights').setup()
const messageService = require('./messaging')
const batching = require('./batching')

process.on('SIGTERM', async () => {
  await messageService.stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await messageService.stop()
  process.exit(0)
})

module.exports = (async function startService () {
  await messageService.start()
  await batching.start()
}())
