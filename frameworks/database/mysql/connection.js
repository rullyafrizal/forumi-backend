import Sequelize from 'sequelize'

export default function connection (config, options) {
  function connectToSequelize () {
    return new Sequelize(config.database, config.username, config.password, config.options)
  }

  return {
    connectToSequelize
  }
}
