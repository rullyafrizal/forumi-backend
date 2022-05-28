import Sequelize from 'sequelize'

export default function connection (config, options) {
  function connectToSequelize () {
    return new Sequelize(config.uri, config.options)
  }

  return {
    connectToSequelize
  }
}
