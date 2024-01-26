const express = require('express');
const postController = require('../contollers/post.controller');

const router = express.Router();

router.route('/').get(postController.getPosts).post(postController.createPost);

module.exports = router;
