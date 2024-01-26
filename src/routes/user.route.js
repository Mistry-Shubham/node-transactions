const express = require('express');
const userController = require('../contollers/user.controller');

const router = express.Router();

router.route('/').get(userController.getUsers).post(userController.createUser);

module.exports = router;
