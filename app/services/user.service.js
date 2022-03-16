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
      'first_name',
      'last_name',
      'email',
      'status',
      'created_at',
      'updated_at'
    ]
  });

  return users
}

const createUser = async (params) => {
  const user = await User.create(params);

  return user;
}

module.exports = {
  getUserList,
  createUser
}