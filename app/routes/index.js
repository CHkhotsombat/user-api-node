import express from 'express'
import { router as apiBackendV1 } from './api/backend/v1'

export const router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  res.status(200).json({
    message: 'Welcome to Node js User API',
    nodeVersion: process.versions?.node,
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
  })
})

router.use('/api/backend/v1', apiBackendV1)
