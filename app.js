import express from 'express'
import expressConfig from './frameworks/webserver/express.js'
import errorHandlingMiddleware from './frameworks/webserver/middlewares/error-handling-middleware.js'
import http from 'http'
import serverConfig from './frameworks/webserver/server.js'
import webserverConfig from './config/server.js'
import sequelizeConfig from './config/sequelize.js'
import mysqlConnection from './frameworks/database/mysql/connection.js'
import routes from './frameworks/webserver/routes/index.js'
import initModels from './frameworks/database/mysql/models/init-models.js'

const app = express()
const server = http.createServer(app)

expressConfig(app)

const sequelizeConn = mysqlConnection(sequelizeConfig, {}).connectToSequelize()
serverConfig(app, sequelizeConn, server, webserverConfig).startServer()

const models = initModels(sequelizeConn)

routes(app, express, models)

app.use('/', function (req, res, next) {
  return res.status(200).json({
    status_code: 200,
    message: 'Welcome to forumi backend API'
  })
})
// global error handling middleware
app.use(errorHandlingMiddleware)

export default app
