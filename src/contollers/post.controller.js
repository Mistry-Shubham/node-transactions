const asyncHandler = require('express-async-handler');
const Post = require('../models/post.model');
const User = require('../models/user.model');

const getPosts = asyncHandler(async (req, res) => {
	const posts = await Post.find({ userId: req.query.userId });

	res.status(200).json(posts);
});

const createPost = asyncHandler(async (req, res) => {
	const { message, userId } = req.body;
	const post = await Post.create({ message, userId });

	await User.findByIdAndUpdate(userId, { $push: { posts: post._id } });

	res.status(200).json(post);
});

module.exports = { getPosts, createPost };
