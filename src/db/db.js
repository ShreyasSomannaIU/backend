const mongoose = require("mongoose");
const DB_NAME = require("../constants.js").DB_NAME;

const connectToDatabase = async () => {
  try {
    const connnectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`\n MongoDB connected !! DB HOST: ${connnectionInstance.connection.host}`);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  } }

  exports = module.exports = connectToDatabase;