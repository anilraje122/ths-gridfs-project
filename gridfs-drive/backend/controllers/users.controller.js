const { validationResult } = require("express-validator");
const registerController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

module.exports = { registerController };
