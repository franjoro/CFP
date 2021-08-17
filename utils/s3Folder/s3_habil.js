require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-west-2" });
const s3 = new AWS.S3({
  accessKeyId: process.env.AWSID,
  secretAccessKey: process.env.AWSKEY,
  apiVersion: "2006-03-01",
});

const encodeToImage = (data) => {
  let buf = Buffer.from(data);
  let base64 = buf.toString("base64");
  return base64;
};



s3Functions = {};

s3Functions.uploadGlobal = (file, identifier, ext, idSolicitud, posicion,carpeta) =>
 
  new Promise((resolve, reject) => {
  const uploadParams = { Bucket: process.env.BUCKET, Key: "", Body: file };
  uploadParams.Key = `app/${carpeta}/${idSolicitud}/${identifier}.${ext}`;
  let status = s3.upload(uploadParams, (err, data) => {
    console.log(file.length);
    if (err) {
      reject(err);
    }
    if (data) {
      return resolve({ posicion, key: uploadParams.Key, data });
    }
  });
  return status;
});


module.exports = s3Functions;
