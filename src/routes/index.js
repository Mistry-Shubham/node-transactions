const express = require('express');
const userRoute = require('./user.route');
const postRoute = require('./post.route');

const router = express.Router();

const routes = [
	{
		path: '/users',
		route: userRoute,
	},
	{
		path: '/posts',
		route: postRoute,
	},
];

routes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
