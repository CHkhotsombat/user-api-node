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

const getOneUser = async (id) => {
  return await User.findByPk(id)
}

const getOneUserByEmail = async (email) => {
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

module.exports = {
  getUserList,
  getOneUser,
  getOneUserByEmail,
  createUser
}