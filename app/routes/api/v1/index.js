const express = require('express')
const router = express.Router()
const usersRouter = require('./users')
const { errorMethodNotAllowed } = require('../../../utils/apiHelpers')

// user routes
router.use('/users', usersRouter)

// Method not allowed
router.all(['/users'], (req, res, next) => {  
  next(errorMethodNotAllowed())
})

module.exports = router
