import express from 'express'
import * as userService from '../../../../services/user.service'
import {
  pagination,
  responseWithPaging,
  errorValidateFailed,
  responseSuccess,
} from '../../../../utils/apiHelpers'
import { validateCreateUserSchema, validateUpdateUserSchema } from './schema/user.schema'
import * as userEntity from './entities/user.entity'
import { authorizeAdmin } from '../../../../middleware/authorize_admin'
import { uploadImage, uploadBufferFile } from '../../../../utils/uploadFile'
import _ from 'lodash'
import { sequelize } from '../../../../models'
import { userAvatarPath } from '../../../../utils/helpers'
import fs from 'fs'
import path from 'path'
import * as XLSX from 'xlsx'
import { Readable } from 'stream'
XLSX.stream.set_readable(Readable)

export const router = express.Router()
export const uploadAvatarImage = uploadImage({
  filePath: '/users/avatars',
  fieldName: 'avatar',
})
export const importUserBuffer = uploadBufferFile({
  fieldName: 'file',
})

router.get('/', authorizeAdmin('readUser'), getUserList)
router.post('/', authorizeAdmin('addUser'), createUser)
router.post('/import_users', authorizeAdmin('addUser'), importUserBuffer, importUsers)
router.get('/:id/', authorizeAdmin('readUser'), findById)
router.put('/:id/', authorizeAdmin('updateUser'), updateUser)
router.delete('/:id/', authorizeAdmin('deleteUser'), deleteUser)
router.post('/:id/upload_avatar', authorizeAdmin('updateUser'), uploadAvatarImage, uploadAvatar)

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
    next(error)
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
      next(error)
    }
  }
}

export async function importUsers(req, res, next) {
  const tx = await sequelize.transaction()

  try {
    const workbook = XLSX.read(req.file.buffer)

    const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
    const to_import_users = _.map(data, (item) => (
      {
        firstName: item.FirstName,
        lastName: item.LastName,
        email: item.Email,
      }
    ))

    // validate exist users
    const emailes = _.map(to_import_users, 'email')
    const users = await userService.findAllUsers({ email: emailes })

    if (!_.isEmpty(users)) {
      const existEmailes = _.map(users, 'email')

      return next(errorValidateFailed({ message: `Duplicate users : ${existEmailes.join(', ')}` }))
    }

    // create bulk users
    await userService.createBulkUsers(to_import_users)
    await tx.commit()

    responseSuccess({ res, status: 201 })
  } catch (error) {
    await tx.rollback()
    next(error)
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

export async function uploadAvatar(req, res, next) {
  const tx = await sequelize.transaction()

  try {
    const filename = _.get(req, 'file.filename')
    const user = await userService.findById(req.params.id)
    const avatarName = user.avatarName
    const userResult = await userService.uploadAvatar(user, filename, { tx })
    await tx.commit()

    // Remove old avatar
    if (!_.isEmpty(avatarName)) fs.unlinkSync(path.join(__basedir, userAvatarPath(avatarName)))

    responseSuccess({ res, status: 200 })
  } catch (error) {
    await tx.rollback()
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
