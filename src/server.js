const express = require('express');
require('dotenv').config();
require('./config/db')();

const { PORT } = process.env;

const app = express();

app.get('/', (req, res) => {
	res.status(200).json({ msg: 'Api is running' });
});

app.listen(PORT, () => console.log(`Server running om port ${PORT}`));
