require('./insights').setup()
const messaging = require('./messaging')
const batching = require('./batching')

process.on('SIGTERM', async () => {
  await messaging.stop()
  process.exit(0)
})

process.on('SIGINT', async () => {
  await messaging.stop()
  process.exit(0)
})

module.exports = (async function startService () {
  await messaging.start()
  await batching.start()
}())
