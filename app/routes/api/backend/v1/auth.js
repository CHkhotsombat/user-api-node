import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { sequelize } from '../../../../models'
import * as AdminService from '../../../../services/admin.service'
import * as RoleService from '../../../../services/role.service'
import * as AdminRoleService from '../../../../services/admin_role.service'
import {
  errorValidateFailed,
  internalServerError,
  responseSuccess,
  errorUnauthorize,
} from '../../../../utils/apiHelpers'
import { createAdminSchema } from './schema/admin.schema'
import * as adminEntity from './entities/admin.entity'

export const router = express.Router()

router.post('/register', register)
router.post('/login', login)

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

export async function login(req, res, next) {
  try {
    const { email, password } = req.body

    let admin = await AdminService.findByEmail(email)
    const match = await bcrypt.compare(password, admin.password)

    if (match) {
      // const token = jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '1d' })
      const token = jwt.sign(
        { email },
        process.env.TOKEN_SECRET,
        { expiresIn: '1d' }
      )

      responseSuccess({
        res,
        status: 201,
        data: {
          token: token, admin: adminEntity.adminDetail(admin),
        },
      })
    } else {
      return next(errorUnauthorize())
    }
  } catch (error) {
    next(internalServerError(error))
  }
}