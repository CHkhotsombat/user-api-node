import boom from '@hapi/boom'
import models from '../models'
const User = models.User;

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
      'updatedAt'
    ]
  });

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
      email: email 
    }
  })

  return user
}

export const createUser = async (params) => {
  return await User.create(params);
}

export const deleteUser = async (id) => {
  const user = await User.destroy({
    where: {
      id: id
    }
  })

  return user
}
