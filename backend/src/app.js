const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { errorHandler } = require('./middlewares/errorMiddleware');
const loadRoutes = require('./routes/loadRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/loads', loadRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Bhariya Logistics API' });
});

app.use(errorHandler);

module.exports = app;
