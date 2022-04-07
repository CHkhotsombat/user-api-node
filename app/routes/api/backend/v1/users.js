import express from 'express'
import * as userService from '../../../../services/user.service'
import {
  pagination,
  responseWithPaging,
  errorValidateFailed,
  internalServerError,
} from '../../../../utils/apiHelpers'

import { validateCreateUser } from './schema/user.schema'
import * as userEntity from './entities/user.entity'

export const router = express.Router()

/* GET users listing. */
router.get('/', getUserList)

// POST create user
router.post('/', createUser)

// Route User id
router.route('/:id').get(findById).delete(deleteUser)

export async function getUserList(req, res, next) {
  try {
    const { page, pageSize } = req.query
    const { limit, offset } = pagination(page, pageSize)

    const results = await userService.getUserList({
      limit,
      offset,
    })

    res.status(200).json(responseWithPaging({ results, page, pageSize }))
  } catch (error) {
    next(internalServerError(error))
  }
}

export async function createUser(req, res, next) {
  try {
    const errors = validateCreateUser(req.body)

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
    res.status(201).json({
      code: 'success',
      data: null,
    })
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

    res.status(200).json({
      code: 'success',
      data: userEntity.userDetail(user),
    })
  } catch (error) {
    next(error)
  }
}

export async function deleteUser(req, res, next) {
  try {
    await userService.findById(req.params.id)
    await userService.deleteUser(req.params.id)

    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}
