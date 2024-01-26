const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
	{
		message: {
			type: String,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
