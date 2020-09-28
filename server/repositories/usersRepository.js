module.exports = (db) => {
  const users = db.collection('users');

  return {
    async findOne(email) {
      return users.findOne({ email });
    },
    async insertOne(user) {
      return users.insertOne(user);
    },
  };
};
