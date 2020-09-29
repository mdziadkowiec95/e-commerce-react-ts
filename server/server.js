(async () => {
  await require('./db/connection')();
  const app = require('./app');

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`E-commerce backend app listening on port ${port}`);
  });
})();
