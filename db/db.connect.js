const mongoose = require("mongoose");

require("dotenv").config();

const mongoUrl = process.env.MONGODB;

const initializeDatabase = async () => {
  await mongoose
    .connect(mongoUrl, { poolSize: 10 })
    .then(() => {
      console.log("Connected  to Database");
    })
    .catch((err) => {
      console.error("Error in connect ", err);
    });
};

module.exports = { initializeDatabase };
