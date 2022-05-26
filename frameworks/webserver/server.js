import { createTerminus } from '@godaddy/terminus'

export default function serverConfig (app, sequelize, serverInit, config) {
  async function healthCheck () {
    try {
      await sequelize.authenticate()
    } catch (err) {
      console.error('Unable to connect to the database:', err)
    }
  }

  function onSignal () {
    console.log('server is starting cleanup')
    return new Promise((resolve, reject) => {
      sequelize
        .close()
        .then(() => {
          console.info('Sequelize has disconnected')
          resolve()
        })
        .catch(reject)
    })
  }

  function beforeShutdown () {
    return new Promise((resolve) => {
      setTimeout(resolve, 15000)
    })
  }

  function onShutdown () {
    console.log('cleanup finished, server is shutting down')
  }

  function startServer () {
    createTerminus(serverInit, {
      logger: console.log,
      signal: 'SIGINT',
      healthChecks: {
        '/healthcheck': healthCheck
      },
      onSignal,
      onShutdown,
      beforeShutdown
    }).listen(config.port, config.host, () => {
      console.log(
        'Express server listening on %d, in %s mode',
        config.port,
        app.get('env')
      )
    })
  }

  return {
    startServer
  }
}
