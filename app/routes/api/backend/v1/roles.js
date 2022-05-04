import express from 'express'
import * as RoleService from '../../../../services/role.service'
import * as AbilityService from '../../../../services/ability.service'
import {
  errorValidateFailed,
  pagination,
  responseSuccess,
  responseWithPaging,
} from '../../../../utils/apiHelpers'
import * as RoleEntity from './entities/role.entity'
import { sequelize } from '../../../../models'
import { validateCreateRoleSchema } from './schema/role.schema'

export const router = express.Router()

router.get('/', getRoleList)
router.get('/options', getOptions)
router.post('/', createRole)
router.get('/:id', findById)
router.put('/:id', updateRole)

export async function getRoleList(req, res, next) {
  try {
    const { page, pageSize } = req.query
    const { limit, offset } = pagination(page, pageSize)

    const results = await RoleService.getRoleList({
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
    const results = await AbilityService.getAbilityOptions()
    const data = {
      ability: {
        options: results,
      },
    }

    responseSuccess({ res, data })
  } catch (error) {
    next(error)
  }
}

export async function createRole(req, res, next) {
  const tx = await sequelize.transaction()
  try {
    const result = await RoleService.createRole(req.body, { tx })

    await tx.commit()

    responseSuccess({ res, status: 201 })
  } catch (error) {
    await tx.rollback()
    next(error)
  }
}

export async function findById(req, res, next) {
  try {
    const role = await RoleService.findById(req.params.id)

    responseSuccess({ res, data: RoleEntity.roleDetail(role) })
  } catch (error) {
    next(error)
  }
}

export async function updateRole(req, res, next) {
  const tx = await sequelize.transaction()
  try {
    const errors = validateCreateRoleSchema(req.body)
    if (errors) {
      return next(errorValidateFailed({ errors: errors.details }))
    }

    let role = await RoleService.findById(req.params.id)

    await RoleService.updateRole(role, req.body, { tx })
    await tx.commit()

    role = await RoleService.findById(req.params.id)

    responseSuccess({ res, data: RoleEntity.roleDetail(role) })
  } catch (error) {
    await tx.rollback()
    next(error)
  }
}