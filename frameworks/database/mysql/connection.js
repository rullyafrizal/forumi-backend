import Sequelize from 'sequelize'

export default function connection (config, options) {
  function connectToSequelize () {
    console.log(config)
    return new Sequelize(config.uri, config.options)
  }

  return {
    connectToSequelize
  }
}
