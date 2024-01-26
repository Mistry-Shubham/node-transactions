const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find();

	res.status(200).json(users);
});

const createUser = asyncHandler(async (req, res) => {
	const { name, email, password, age } = req.body;

	const user = await User.create({ name, email, password, age });

	if (!user) {
		res.status(400);
		throw new Error('Failed to create a new user');
	}

	res.status(200).json(user);
});

module.exports = { getUsers, createUser };
