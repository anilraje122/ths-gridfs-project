const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const saltRounds = 10;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  signUpDate: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function () {
  try {
    const user = this;
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
  } catch (err) {
    throw err;
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
