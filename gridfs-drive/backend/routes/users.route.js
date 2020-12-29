var express = require("express");
var router = express.Router();
const { body } = require("express-validator");
const {
  registerController,
  loginController,
  getUser,
} = require("../controllers/users.controller");
const auth = require("../middleware/auth.middleware");

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
    body("confirmPassword").custom((val, { req }) => {
      if (val === req.body.password) {
        return true;
      } else {
        throw new Error("Password does not match!");
      }
    }),
    body("name", "Enter a valid name").exists().isLength({ min: 2 }),
  ],
  registerController
);

router.post(
  "/login",
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
  ],
  loginController
);

router.get("/", auth, getUser);

module.exports = router;
