import express from 'express'
import * as adminService from '../../../../services/admin.service'
import {
  errorValidateFailed,
  internalServerError,
  responseSuccess,
} from '../../../../utils/apiHelpers'
import { createAdminSchema } from './schema/admin.schema'

export const router = express.Router()

router.post('/register', register)

export async function register(req, res, next) {
  try {
    const { count } = await adminService.getAdminList()

    if (count > 0) {
      return next(errorValidateFailed({
        message: 'This APIs for first one register admin',
      }))
    }

    const errors = createAdminSchema(req.body)

    if (errors) {
      console.log('error', errors)
      return next(errorValidateFailed({ errors: errors.details }))
    }

    await adminService.createAdmin(req.body)

    responseSuccess({ res, status: 201 })
  } catch (error) {
    next(internalServerError(error))
  }
}