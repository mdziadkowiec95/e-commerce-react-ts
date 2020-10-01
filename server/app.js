const express = require('express');
const app = express();
const cors = require('cors');
const usersRoutes = require('./routes/api/users');
const authRoutes = require('./routes/api/auth');

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
