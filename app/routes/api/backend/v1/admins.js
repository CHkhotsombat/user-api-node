import express from 'express'
import { pagination, responseSuccess, responseWithPaging } from '../../../../utils/apiHelpers'
import * as AdminService from '../../../../services/admin.service'
import * as RoleService from '../../../../services/role.service'
import * as AdminRoleService from '../../../../services/admin_role.service'
import * as AdminEntity from './entities/admin.entity'
import { sequelize } from '../../../../models'
import _ from 'lodash'
import { authorizeAdmin } from '../../../../middleware/authorize_admin'

export const router = express.Router()

router.get('/', authorizeAdmin('readAdmin'), getAdminList)
router.get('/options', authorizeAdmin('readAdmin'), getOptions)
router.get('/:id', authorizeAdmin('readAdmin'), findById)
router.put('/:id', authorizeAdmin('updateAdmin'), updateAdmin)

export async function getAdminList(req, res, next) {
  try {
    const { page, pageSize } = req.query
    const { limit, offset } = pagination(page, pageSize)
    const results = await AdminService.getAdminList({
      limit,
      offset,
    })

    responseWithPaging(res, { results, page, pageSize })
  } catch (error) {
    next(error)
  }
}

export async function getOptions(req, res, next) {
  try {
    const roleOptions = await RoleService.getRoleOptions()

    const data = {
      role: {
        options: roleOptions,
      },
    }

    responseSuccess({ res, data })
  } catch (error) {
    next(error)
  }
}

export async function findById(req, res, next) {
  try {
    const admin = await AdminService.findById(req.params.id)

    responseSuccess({
      res,
      status: 200,
      data: await AdminEntity.adminDetail(admin),
    })
  } catch (error) {
    next(error)
  }
}

export async function updateAdmin(req, res, next) {
  const tx = await sequelize.transaction()
  try {
    const { firstName, lastName, roleIds } = req.body

    let admin = await AdminService.findById(req.params.id)

    // destroy old admin role
    await AdminRoleService.destroy({ tx, adminId: admin.id })
    await AdminService.updateAdmin(admin, { firstName, lastName }, { tx })

    // create admin role
    const adminRoleBody = _.map(roleIds, (roleId) => ({
      adminId: admin.id,
      roleId: roleId,
    }))
    await AdminRoleService.createBulk(adminRoleBody, { tx })
    await tx.commit()

    admin = await AdminService.findById(req.params.id)

    responseSuccess({
      res,
      status: 200,
      data: await AdminEntity.adminDetail(admin),
    })
  } catch (error) {
    await tx.rollback()
    next(error)
  }
}