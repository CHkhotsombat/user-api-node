const createError = require('http-errors');
const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/user.controller');

/* GET users listing. */
router.get('/', userController.getUserList);

// POST create user
router.post('/', userController.createUser)


module.exports = router;
