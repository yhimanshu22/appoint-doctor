const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) return console.error(colors.bgRed.white("No MONGO_URL")), process.exit(1);
    await mongoose.connect(process.env.MONGO_URL);
    console.log(colors.bgGreen.white(`DB connected: ${mongoose.connection.db.databaseName} @ ${mongoose.connection.host}`));
  } catch (error) {
    console.error(colors.bgRed.white(`DB Error: ${error.message}`)), process.exit(1);
  }
};

module.exports = connectDB;