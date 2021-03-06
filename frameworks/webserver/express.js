import morgan from 'morgan'
import compression from 'compression'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import express from 'express'
import cookieParser from 'cookie-parser'

export default function expressConfig (app) {
  // security middleware
  app.use(helmet())

  app.use(compression())
  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000
    })
  )

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cookieParser())

  app.use((req, res, next) => {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://some-accepted-origin');
    // Request methods you wish to allow
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, Content-type, Authorization, Cache-control, Pragma'
    )
    res.setHeader(
      'Access-Control-Allow-Origin',
      'https://forumi.my.id'
    )
    // Pass to next layer of middleware
    next()
  })
  app.use(morgan('combined'))
}
