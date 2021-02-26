require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-west-2" });
const s3 = new AWS.S3({
  accessKeyId: process.env.AWSID,
  secretAccessKey: process.env.AWSKEY,
  apiVersion: "2006-03-01",
});

s3Functions = {};

s3Functions.upload = (file, identifier, ext, empresa, posicion) =>
  new Promise((resolve, reject) => {
    const uploadParams = { Bucket: process.env.Bucket, Key: "", Body: file };
    uploadParams.Key = `app/empresas/${empresa}/${identifier}.${ext}`;
    let status = s3.upload(uploadParams, (err, data) => {
      if (err) {
        status = false;
        reject(err);
      }
      if (data) {
        status = true;
        resolve({ posicion, key: uploadParams.Key });
      }
    });
    return status;
  });

s3Functions.getFiles = (Key) =>
  new Promise(async (resolve, reject) => {
    const uploadParams = {
      Bucket: process.env.Bucket,
      Key,
    };
    const fs = require("fs");
    keyarr = Key.split(".");
    try {
      s3.getObject(uploadParams, (err, data) => {
        if (err) throw err;
        const path = `./public/files/tmp/tmpfile.${keyarr[1]}`;
        fs.writeFile(path, data.Body, "Binary", (err) => {
          if (err) throw err;
          resolve(keyarr[1]);
        });
      });
    } catch (error) {
      resolve(error);
    }
  });

s3Functions.getFolderData = async (folder, keys) => {
  return new Promise(async (resolve, reject) => {
    const fs = require("fs");
    const join = require("path").join;
    const s3Zip = require("s3-zip");
    const output = fs.createWriteStream(join(__dirname, "archivos.zip"));
    s3Zip
      .archive({ s3, bucket: process.env.Bucket }, folder, keys)
      .pipe(output)
      .on("finish", () => {
        console.log("Zip created");
        resolve(true);
      })
      .on("error", (err) => {
        reject({ message: `Something went wrong ${err.message}` });
      });
  });
};

s3Functions.DeleteAll = (folder) => {
  return new Promise(async (Resolve, Reject) => {});
};

module.exports = s3Functions;
