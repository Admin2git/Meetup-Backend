const mongoose = require("mongoose");

require("dotenv").config();

const mongoUrl = process.env.MONGODB;

const initializeDatabase = async () => {
  await mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10,
      connectTimeoutMS: 30000,
    })
    .then(() => {
      console.log("Connected  to Database");
    })
    .catch((err) => {
      console.error("Error in connect ", err);
    });
};

module.exports = { initializeDatabase };
