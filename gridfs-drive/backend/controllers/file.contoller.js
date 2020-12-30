const { gridFileUpload, gridGetAllUserFiles } = require("../utils/gridfs");

const uploadFile = async (req, res) => {
  try {
    await gridFileUpload(req.file, req.userId);
    res.status(200).json({ upload: "success" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

const getAllFiles = async (req, res) => {
  try {
    let files = await gridGetAllUserFiles(req.userId);
    res.send(files);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errors: [{ msg: "Internal Server Error" }] });
  }
};

module.exports = { uploadFile, getAllFiles };
