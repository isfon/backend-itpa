import express from 'express'
import bodyParser from 'body-parser'

import userRoutes from './users/routes'
import productRoutes from './products/routes'

const app = express()
app.disable('x-powered-by')

app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next()
})

// Routes
app.use('/', userRoutes)
app.use('/', productRoutes)

// root route
app.get('/', (req, res) => {
  res.send('api works')
})

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .send({
      message: err.message
    })
})

export default app
