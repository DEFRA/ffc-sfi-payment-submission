require('./insights').setup()
require('log-timestamp')
const messaging = require('./messaging')
const batching = require('./batching')

process.on(['SIGTERM', 'SIGINT'], async () => {
  await messaging.stop()
  process.exit(0)
})

module.exports = (async function startService () {
  await messaging.start()
  await batching.start()
}())
