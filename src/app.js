import '@babel/polyfill'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import appRoutes from './routes'
require('dotenv').config()

const getir = express()

const corsOptions = {
  credentials: true,
  origin: true,
  optionsSuccessStatus: 200
}

getir.use(cors(corsOptions))
getir.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
getir.use(bodyParser.json())

// routes
getir.use(appRoutes)

// catch 404 and forward to error handler
getir.use((req, res, next) => {
  const err = new Error('Resource does not exist')
  err.status = 404
  err.code = 1
  next(err)
})

getir.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    code: 1,
    msg: err.message
  })
})

export default getir
