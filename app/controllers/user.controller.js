const createError = require('http-errors');
const userService = require('../services/user.service');
const { pagination, responseWithPaging } = require('../utils/apiHelpers');
const { validateCreateUser } = require('../routes/schema/user.schema')
const { userEntity } = require('../entities/index')

const getUserList = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query
    const { limit, offset } = pagination(page, pageSize)
    
    const results = await userService.getUserList({
      limit,
      offset
    })

    res.status(200).json(responseWithPaging({ results, page, pageSize }))
  } catch (error) {
    next(createError(error));
  }
}

const createUser = async (req, res, next) => {
  try {
    const errors = validateCreateUser(req.body)

    if (errors) {
      return next({status: 422, message: 'validate failed', errors: errors.details});
    }

    // validate uniq email
    const user = await userService.findByEmail(req.body.email)
    if (user) {
      return next({status: 422, message: `user email : ${req.body.email} is already exists.`});
    }

    await userService.createUser(req.body)
    res.status(201).json({
      code: 'success',
      data: null
    })
  } catch (error) {
    console.error('Create User error', error);
    next(createError(error));
  }
}

const findById = async (req, res, next) => {
  try {
    const user = await userService.findById(req.params.id)

    res.status(200).json({
      code: 'success',
      data: userEntity.userDetail(user)
    })
  } catch (error) {
    console.error('Find User by ID error', error);
    next(createError(error));
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const _user = await userService.deleteUser(req.params.id)

    res.sendStatus(204);
  } catch (error) {
    console.error('Delete User error', error);
    next(createError(error));
  }
}

module.exports = {
  getUserList,
  createUser,
  deleteUser,
  findById
}