const mongoose = require('mongoose');

const db = async () => {
	let connection = null;
	try {
		connection = await mongoose.connect(process.env.MONGO_URI);
		console.log('MongoDB connected');
	} catch {
		console.log('MongoDB connection failed');
	}

	return connection;
};

module.exports = db;
