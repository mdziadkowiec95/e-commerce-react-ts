const mongoose = require('mongoose');
const url = process.env.MONGO_URI || 'mongodb://localhost:27017/ecom-api';

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Mongo DB connected successfully!');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
