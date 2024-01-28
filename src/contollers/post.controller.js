const asyncHandler = require('express-async-handler');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const mongoose = require('mongoose');

const getPosts = asyncHandler(async (req, res) => {
	const posts = await Post.find({ userId: req.query.userId });

	res.status(200).json(posts);
});

const createPost = asyncHandler(async (req, res) => {
	const session = await mongoose.startSession();
	session.startTransaction();
	let post;
	try {
		const { message, userId } = req.body;
		post = new Post({ message, userId });

		await post.save({ session });

		const user = await User.findById(userId);

		user.posts = [...user.posts, post._id];

		await user.save({ session });

		await session.commitTransaction();
	} catch (err) {
		await session.abortTransaction();
		throw new Error(err);
	} finally {
		session.endSession();
	}

	res.status(200).json(post);
});

module.exports = { getPosts, createPost };
