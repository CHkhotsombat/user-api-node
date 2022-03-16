const createError = require('http-errors');
const userService = require('../services/user.service');
const { pagination, responseWithPaging } = require('../utils/apiHelpers');

const getUserList = async (req, res, next) => {
  try {
    const { page, page_size } = req.query
    const { limit, offset } = pagination(page, page_size)
    
    const results = await userService.getUserList({
      limit,
      offset
    })

    res.status(200).json(responseWithPaging({ results, page, page_size }))
  } catch (error) {
    next(createError(error));
  }
}

const createUser = async (req, res, next) => {
  try {
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

module.exports = {
  getUserList,
  createUser
}