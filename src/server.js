const express = require('express');
require('dotenv').config();
const db = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const apiRoutes = require('./routes');

const { PORT } = process.env;

db();

const app = express();
app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
	res.status(200).json({ message: 'Api is running' });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running om port ${PORT}`));
