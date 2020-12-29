var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/register",
  [
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Enter a valid password. (8 char alphanumeric)").custom(
      (val) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (regex.test(val)) {
          return true;
        } else {
          throw new Error(
            "Password must contain 8 chars and must have 1 letter and 1 number"
          );
        }
      }
    ),
    body("confirmPassword", "Password do not match").custom((val, { req }) => {
      if (val === req.body.password) {
        return true;
      } else {
        throw new Error("Password does not match!");
      }
    }),
    body("name", "Name is required").exists(),
  ],
  (req, res) => {}
);

module.exports = router;
