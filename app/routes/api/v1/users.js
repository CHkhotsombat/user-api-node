const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/user.controller');

/* GET users listing. */
router.get('/', userController.getUserList);

// POST create user
router.post('/', userController.createUser)

// Delete user
router.route('/:id')
  .delete(userController.deleteUser)
  .get(userController.findById)

module.exports = router;
