const mongoose = require("mongoose");
const logger = require('../log/logger')

mongoose
  .connect("mongodb://127.0.0.1:27017/Assignment3-UnitTesting")
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((e) => {
    logger.error("Unsuccessful Connection To MongoDB");
  });

