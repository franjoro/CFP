require("dotenv").config();
const AWS = require("aws-sdk");

AWS.config.update({ region: "us-west-2" });
const s3 = new AWS.S3({
  accessKeyId: process.env.AWSID,
  secretAccessKey: process.env.AWSKEY,
  apiVersion: "2006-03-01",
});

s3Functions = {};

s3Functions.upload = (file, curso, identifier, ext, empresa) =>
  new Promise((resolve, reject) => {
    const uploadParams = { Bucket: process.env.Bucket, Key: "", Body: file };

    uploadParams.Key = `app/cursos/${curso}/${empresa}/${identifier}.${ext}`;
    let status = s3.upload(uploadParams, (err, data) => {
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

s3Functions.getFiles = (Key) =>
  new Promise(async (resolve, reject) => {
    const uploadParams = {
      Bucket: process.env.Bucket,
      Key,
    };
    const fs = require("fs");

    try {
      s3.getObject(uploadParams, (err, data) => {
        if (err) throw err;
        fs.writeFile(
          "./public/files/tmpfile.pdf",
          data.Body,
          "Binary",
          (err) => {
            if (err) throw err;
            resolve(data);
          }
        );
      });
    } catch (error) {
      resolve(error);
    }
  });

s3Functions.getFolderData = async (folder) => {
  new Promise(async (resolve, reject) => {
    const fs = require("fs");
    const join = require("path").join;
    const s3Zip = require("s3-zip");
    try {
      const output = fs.createWriteStream(join(__dirname, "archivos.zip"));
      s3Zip
        .archive({ s3, bucket: process.env.Bucket }, folder, [
          "recibo.pdf",
          "cancelacion.pdf",
          "ficha.pdf",
          "planilla.pdf",
        ])
        .pipe(output);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = s3Functions;
