import express from 'express'
import { errorMethodNotAllowed } from '../../../../utils/apiHelpers'
import { router as usersRouter } from './users'
import { router as adminRouter } from './admins'
import { router as authRouter } from './auth'
import { authenticateAdmin } from '../../../../middleware/authenticate_admin'

export const router = express.Router()

// routes
router.use('/users', usersRouter)
router.use('/auth', authRouter)

router.use(authenticateAdmin)
router.use('/admins', adminRouter)

// Method not allowed
router.all(['/users', '/admins', '/auth/*'], (req, res, next) => {
  next(errorMethodNotAllowed())
})
