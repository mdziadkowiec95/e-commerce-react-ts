module.exports = (db) => {
  const express = require('express');
  const app = express();
  const cors = require('cors');
  const usersRoutes = require('./routes/api/users')(db);

  app.use(cors());
  app.use(express.json());

  app.use('/api/users', usersRoutes);

  return app;
};
