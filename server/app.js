const express = require('express');
const app = express();
const cors = require('cors');
const usersRoutes = require('./routes/api/users');

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);

module.exports = app;
