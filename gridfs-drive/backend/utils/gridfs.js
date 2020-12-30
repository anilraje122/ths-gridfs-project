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
      .pipe(
        bucket.openUploadStream(file.originalname, {
          metadata: {
            userId,
          },
          contentType: file.mimetype,
        })
      )
      .on("error", function (err) {
        rej(err);
      })
      .on("finish", function () {
        res("done");
      });
  });
};

let gridGetAllUserFiles = (userId) => {
  let db = mongoose.connection.db;
  var bucket = new mongodb.GridFSBucket(db, { bucketName: "drive" });
  return new Promise((res, rej) => {
    let allFiles = bucket.find({
      metadata: {
        userId,
      },
    });
    res(allFiles.toArray());
  });
};

module.exports = {
  gridFileUpload,
  gridGetAllUserFiles,
};
