import boom from '@hapi/boom'
import models from '../models'
import { cleanNullKeys } from '../utils/helpers'
const User = models.User

export const getUserList = async (params) => {
  let { offset, limit } = params

  const users = await User.findAndCountAll({
    limit,
    offset,
    where: {},
    attributes: [
      'id',
      'firstName',
      'lastName',
      'email',
      'status',
      'createdAt',
      'updatedAt',
    ],
  })

  return users
}

export const findAllUsers = async (params, opts = {}) => {
  const { tx } = opts
  const { email } = params
  const users = await User.findAll(
    {
      where: cleanNullKeys({
        email,
      }),
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'status',
        'createdAt',
        'updatedAt',
      ],
    }, {
      transaction: tx,
    }
  )

  return users
}

export const findById = async (id, opts = {}) => {
  const { exceptNotFound = false } = opts
  const user = await User.findByPk(id)

  if (!exceptNotFound && !user) throw boom.notFound('User not found.')

  return user
}

export const findByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  })

  return user
}

export const createUser = async (params) => {
  return await User.create(params)
}

export const createBulkUsers = async (body, opts = {}) => {
  const { tx } = opts
  const result = await User.bulkCreate(
    body,
    {
      fields: ['firstName', 'lastName', 'email'],
      updateOnDuplicate: ['email'],
      transaction: tx,
    }
  )

  result
}

export const deleteUser = async (id) => {
  const user = await User.destroy({
    where: {
      id: id,
    },
  })

  return user
}

export const uploadAvatar = async (user, avatarName, opts = {}) => {
  const { tx } = opts

  await user.update({
    avatarName,
  }, {
    transaction: tx,
  })

  return user
}