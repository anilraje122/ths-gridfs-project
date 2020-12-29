const { gridFileUpload } = require("../utils/gridfs");

const uploadFile = async (req, res) => {
  try {
    await gridFileUpload(req.file, req.userId);
    res.status(200).json({ upload: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

module.exports = { uploadFile };
