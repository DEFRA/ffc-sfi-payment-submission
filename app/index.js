require('./insights').setup()
require('log-timestamp')
const { initialiseContainers } = require('./storage')
const messaging = require('./messaging')
const batching = require('./batching')

process.on(['SIGTERM', 'SIGINT'], async () => {
  await messaging.stop()
  process.exit(0)
})

module.exports = (async function startService () {
  await initialiseContainers()
  await messaging.start()
  await batching.start()
}())
