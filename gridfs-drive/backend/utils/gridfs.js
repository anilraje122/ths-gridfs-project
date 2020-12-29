const mongoose = require("mongoose");
const mongodb = require("mongodb");
const { Readable } = require("stream");

let gridFileUpload = (file, userId) => {
  let db = mongoose.connection.db;
  var bucket = new mongodb.GridFSBucket(db, { bucketName: "drive" });
  const buffer = file.buffer;
  function bufferToStream(buffer) {
    var stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }
  return new Promise((res, rej) => {
    bufferToStream(buffer)
      .pipe(bucket.openUploadStream(file.originalname), {
        meta: {
          userId,
        },
        contentType: file.mimetype,
      })
      .on("error", function (err) {
        rej(err);
      })
      .on("finish", function () {
        res("done");
      });
  });
};

module.exports = {
  gridFileUpload,
};
