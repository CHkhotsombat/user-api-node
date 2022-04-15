import express from 'express'
import { sequelize } from '../../../../models'
import * as AdminService from '../../../../services/admin.service'
import * as RoleService from '../../../../services/role.service'
import * as AdminRoleService from '../../../../services/admin_role.service'
import {
  errorValidateFailed,
  internalServerError,
  responseSuccess,
} from '../../../../utils/apiHelpers'
import { createAdminSchema } from './schema/admin.schema'

export const router = express.Router()

router.post('/register', register)

export async function register(req, res, next) {
  const tx = await sequelize.transaction()
  try {
    const { count } = await AdminService.getAdminList()

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

    const role = await RoleService.findByCode('admin', { tx })
    const admin = await AdminService.createAdmin(
      {
        ...req.body,
      }, 
      { tx }
    )
    await AdminRoleService.createAdminRole([
      {
        admin_id: admin.id,
        role_id: role.id,
      },
    ], {
      tx,
    })

    console.log('admin roles', admin.adminRoles)

    await tx.commit()

    responseSuccess({ res, status: 201 })
  } catch (error) {
    await tx.rollback()
    next(internalServerError(error))
  }
}