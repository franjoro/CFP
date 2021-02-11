require("dotenv").config();
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
const s3 = new AWS.S3({
  accessKeyId: process.env.AWSID,
  secretAccessKey: process.env.AWSKEY,
  apiVersion: "2006-03-01",
});

s3Functions = {};

s3Functions.upload = (file, curso, ext) => {
  return new Promise((resolve, reject) => {
    var uploadParams = { Bucket: process.env.Bucket, Key: "", Body: file };

    uploadParams.Key = `app/cursos/${curso}/archivos1.${ext}`;
    let status = s3.upload(uploadParams, function (err, data) {
      if (err) {
        status = false;
        reject(err);
      }
      if (data) {
        console.log("done");
        status = true;
        resolve(data);
      }
    });
    return status;
  });
};

module.exports = s3Functions;
