const { validationResult } = require("express-validator");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

const registerController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, apssword, name } = req.body;
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
        res.status(200).json({ token: jwtToken });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

module.exports = { registerController };
