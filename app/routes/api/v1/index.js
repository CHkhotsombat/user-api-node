const createError = require('http-errors')
const express = require('express')
const router = express.Router()
const usersRouter = require('./users')

// user routes
router.use('/users', usersRouter)

// Method not allowed
router.all(['/users'], (req, res, next) => {  
  next(createError(405))
})

module.exports = router
