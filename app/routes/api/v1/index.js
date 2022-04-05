import express from 'express'
import { router as usersRouter } from './users'
import { errorMethodNotAllowed } from '../../../utils/apiHelpers'

export const router = express.Router()

// user routes
router.use('/users', usersRouter)

// Method not allowed
router.all(['/users'], (req, res, next) => {
  next(errorMethodNotAllowed())
})
