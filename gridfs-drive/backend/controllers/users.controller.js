const { validationResult } = require("express-validator");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");
const auth = require("../middleware/auth.middleware");

const registerController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, name } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User Already Exist" }] });
    }
    user = new User({ email, password, name });
    await user.save();
    const payload = {
      userId: user._id,
    };
    jwt.sign(payload, jwtSecret, { expiresIn: "10 days" }, (err, token) => {
      if (err) {
        throw err;
      } else {
        res.status(200).json({ jwtToken: token });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

const loginController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    let checkUser = await User.findByCredentials(email, password);
    if (checkUser.error) {
      return res.status(400).json({ errors: [{ msg: checkUser.msg }] });
    }
    const payload = {
      userId: checkUser._id,
    };
    jwt.sign(payload, jwtSecret, { expiresIn: "10 days" }, (err, token) => {
      if (err) {
        throw err;
      } else {
        res.status(200).json({ jwtToken: token });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

module.exports = { registerController, loginController, getUser };
