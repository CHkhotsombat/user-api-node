import express from 'express'
import * as userService from '../../../../services/user.service'
import {
  pagination,
  responseWithPaging,
  errorValidateFailed,
  internalServerError,
  responseSuccess,
} from '../../../../utils/apiHelpers'

import { validateCreateUserSchema, validateUpdateUserSchema } from './schema/user.schema'
import * as userEntity from './entities/user.entity'

export const router = express.Router()

router.get('/', getUserList)
router.post('/', createUser)
router.get('/:id/', findById)
router.put('/:id/', updateUser)
router.delete('/:id/', deleteUser)

export async function getUserList(req, res, next) {
  try {
    const { page, pageSize } = req.query
    const { limit, offset } = pagination(page, pageSize)

    const results = await userService.getUserList({
      limit,
      offset,
    })
    responseWithPaging(res, { results, page, pageSize })
  } catch (error) {
    next(internalServerError(error))
  }
}

export async function createUser(req, res, next) {
  try {
    const errors = validateCreateUserSchema(req.body)

    if (errors) {
      return next(errorValidateFailed({ errors: errors.details }))
    }

    // validate uniq email
    const user = await userService.findByEmail(req.body.email)
    if (user) {
      return next(
        errorValidateFailed({
          message: `user email : ${req.body.email} is already exists.`,
        })
      )
    }

    await userService.createUser(req.body)

    responseSuccess({ res, status: 201 })
  } catch (error) {
    console.error('Create User error', error)

    if (error.name === 'SequelizeUniqueConstraintError') {
      next(errorValidateFailed({errors: error.errors}))
    } else {
      next(internalServerError(error))
    }
  }
}

export async function findById(req, res, next) {
  try {
    const user = await userService.findById(req.params.id)

    responseSuccess({ res, status: 200, data: userEntity.userDetail(user) })
  } catch (error) {
    next(error)
  }
}

export async function updateUser(req, res, next) {
  try {
    const user = await userService.findById(req.params.id)

    const errors = validateUpdateUserSchema(req.body)

    if (errors) {
      return next(errorValidateFailed({ errors: errors.details }))
    }

    await user.update({
      ...req.body,
    })

    responseSuccess({ res, status: 200, data: userEntity.userDetail(user) })
  } catch (error) {
    next(error)
  }
}

export async function deleteUser(req, res, next) {
  try {
    await userService.findById(req.params.id)
    await userService.deleteUser(req.params.id)

    responseSuccess({ res })
  } catch (error) {
    next(error)
  }
}
