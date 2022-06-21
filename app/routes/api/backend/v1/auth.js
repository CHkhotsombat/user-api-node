import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { sequelize } from '../../../../models'
import * as AdminService from '../../../../services/admin.service'
import * as RoleService from '../../../../services/role.service'
import * as AdminRoleService from '../../../../services/admin_role.service'
import {
  errorValidateFailed,
  responseSuccess,
  errorUnauthorize,
} from '../../../../utils/apiHelpers'
import { createAdminSchema } from './schema/admin.schema'
import * as AdminEntity from './entities/admin.entity'
import { authenticateAdmin } from '../../../../middleware/authenticate_admin'

export const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/info', authenticateAdmin, info)

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
      return next(errorValidateFailed({ errors: errors.details }))
    }

    const role = await RoleService.findByCode('admin', { tx })
    const admin = await AdminService.createAdmin(
      {
        ...req.body,
      },
      { tx }
    )
    await AdminRoleService.createBulk([
      {
        adminId: admin.id,
        roleId: role.id,
      },
    ], {
      tx,
    })

    await tx.commit()

    responseSuccess({ res, status: 201 })
  } catch (error) {
    await tx.rollback()
    next(error)
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body

    let admin = await AdminService.findByEmail(email)
    const match = await bcrypt.compare(password, admin.password)

    if (match) {
      const token = jwt.sign(
        { email },
        process.env.TOKEN_SECRET,
        { expiresIn: '10d' }
      )

      responseSuccess({
        res,
        status: 201,
        data: {
          token: token, admin: await AdminEntity.adminDetail(admin),
        },
      })
    } else {
      return next(errorUnauthorize())
    }
  } catch (error) {
    next(error)
  }
}

export async function info(req, res, next) {
  try {
    responseSuccess({
      res,
      status: 200,
      data: await AdminEntity.adminDetail(req.current_admin),
    })
  } catch (error) {
    next(error)
  }
}