const express = require('express')
const router = express.Router()
const apiV1 = require('./api/v1/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    message: "Welcome to Node js User API",
    nodeVersion: process.versions?.node,
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
  })
})

router.use('/api/v1', apiV1)

module.exports = router