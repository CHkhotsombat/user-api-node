import jwt from 'jsonwebtoken'
import * as AdminService from '../services/admin.service'
import { errorUnauthorize } from '../utils/apiHelpers'

export const authenticateAdmin = async (req, res, next) => {
  // const token = req.headers.admin_auth_token

  const authorization = req.headers.authorization || req.headers.Authorization
  if (!authorization || !authorization.startsWith('Bearer ')) return next(errorUnauthorize())

  const token = authorization.split(' ')[1]

  jwt.verify(
    token,
    process.env.TOKEN_SECRET,
    async (error, decoded) => {
      if (error) return next(errorUnauthorize())

      req.current_admin = await AdminService.findByEmail(decoded.email)
      next()
    }
  )
}