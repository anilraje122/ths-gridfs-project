const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middleware/auth.middleware");
const { uploadFile, getAllFiles } = require("../controllers/file.contoller");

// Use below code to upload the file into a directory (local storage)
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

var storage = multer.memoryStorage();
var upload = multer({ storage });

/* 
route POST /api/file/upload
desc  Upload a file to DB
access Private
*/
router.post("/upload", auth, upload.single("file"), uploadFile);

router.get("/all", auth, getAllFiles);

module.exports = router;
