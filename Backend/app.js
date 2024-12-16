const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const packageRoutes = require('./Routes/packageRoutes');
const bookingRoutes = require('./Routes/bookingRoutes');

const app = express();

app.use(cors({
    origin:"*"
}));
app.use(bodyParser.json());

app.use('/', packageRoutes);
app.use('/', bookingRoutes);

module.exports = app;
