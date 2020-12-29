const mongoose = require("mongoose");
const { mongoURI } = require("./keys");

const db = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected " + mongoURI);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = db;
