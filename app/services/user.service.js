const models = require('../models');
const User = models.User;

const getUserList = async (params) => {
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

const findById = async (id) => {
  return await User.findByPk(id)
}

const findByEmail = async (email) => {
  const user = await User.findOne({
    where: { 
      email: email 
    }
  })

  return user.get()
}

const createUser = async (params) => {
  return await User.create(params);
}

const deleteUser = async (id) => {
  const user = await User.destroy({
    where: {
      id: id
    }
  })

  return user
}

module.exports = {
  getUserList,
  findById,
  findByEmail,
  createUser,
  deleteUser
}