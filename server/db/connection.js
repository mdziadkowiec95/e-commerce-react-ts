const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGO_URI || 'mongodb://localhost:27017/ecom-api';

module.exports = MongoClient.connect(url, {
  bufferMaxEntries: 0,
  useUnifiedTopology: true,
}).then(function (client) {
  return client.db();
});
