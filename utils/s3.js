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

s3Functions.upload = (file, identifier, ext, empresa, posicion) =>
  new Promise((resolve, reject) => {
    const uploadParams = { Bucket: process.env.BUCKET, Key: "", Body: file };
    uploadParams.Key = `app/empresas/${empresa}/${identifier}.${ext}`;
    let status = s3.upload(uploadParams, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve({ posicion, key: uploadParams.Key });
      }
    });
    return status;
  });

s3Functions.deleteObject = (Key) =>
  new Promise((resolve, reject) => {
    const uploadParams = { Bucket: process.env.BUCKET, Key };
    s3.deleteObject(uploadParams, function (err, data) {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log(data);
      resolve(data);
    });
  });

s3Functions.uploadImageCursos = (file, ext, curso) =>
  new Promise((resolve, reject) => {
    const uploadParams = { Bucket: process.env.BUCKET, Key: "", Body: file };
    uploadParams.Key = `app/cursos/${curso}/portada.${ext}`;
    let status = s3.upload(uploadParams, (err, data) => {
      if (err) {
        reject(err);
      }
      if (data) {
        return resolve(data);
      }
    });
    return status;
  });

s3Functions.getHtmlImageFroms3 = (Key) =>
  new Promise(async (resolve, reject) => {
    const uploadParams = { Bucket: process.env.BUCKET, Key };
    s3.getObject(uploadParams, (err, data) => {
      if (err) throw err;
      let image = `<img src='data:image/jpeg;base64,${encodeToImage(
        data.Body
      )}'/>`;
      resolve(image);
    });
  });

s3Functions.getFiles = (Key) =>
  new Promise(async (resolve, reject) => {
    const uploadParams = {
      Bucket: process.env.BUCKET,
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

const AdmZip = require("adm-zip");

s3Functions.getFolderData = async (folder, keys, Role) => {
  return new Promise(async (resolve, reject) => {
    const fs = require("fs");
    const join = require("path").join;
    const s3Zip = require("s3-zip");
    const output = fs.createWriteStream(join(__dirname, "archivos.zip"));
    s3Zip
      .archive({ s3, bucket: process.env.BUCKET }, folder, keys)
      .pipe(output)
      .on("finish", () => {
        const zip = new AdmZip(output.path);
        const zipEntries = zip.getEntries();
        const newZip = new AdmZip();
        zipEntries.forEach(function (zipEntry, i) {
          let ext = keys[i].split(".");
          let archivo = `${i + 1}_Archivo_extra`;
          if (Role[i] == 1) {
            archivo = `${i + 1}_Solicitud_capacitacion`;
          }
          if (Role[i] >= 20 && Role[i] < 30) {
            archivo = `${i + 1}_Recibo_aportacion`;
          }
          if (Role[i] >= 30 && Role[i] < 40) {
            archivo = `${i + 1}_Comprobante_pago_linea`;
          }
          if (Role[i] >= 40) {
            archivo = `${i + 1}_Planilla_ISSS`;
          }
          var newFileName = `${archivo}.${ext[1]}`;
          newZip.addFile(newFileName, zipEntry.getData());
        });

        newZip.writeZip(output.path);
        resolve(true);
      })
      .on("error", (err) => {
        reject({ message: `Something went wrong ${err.message}` });
      });
  });
};

s3Functions.getFolderDataCurso = async (folder, keys, Role, empresas) => {
  return new Promise(async (resolve, reject) => {
    const fs = require("fs");
    const join = require("path").join;
    const s3Zip = require("s3-zip");
    const output = fs.createWriteStream(
      join(__dirname, "archivos_de_curso.zip")
    );
    s3Zip
      .archive({ s3, bucket: process.env.BUCKET }, folder, keys)
      .pipe(output)
      .on("finish", () => {
        const zip = new AdmZip(output.path);
        const zipEntries = zip.getEntries();
        const newZip = new AdmZip();

        // empresasforEach((empresa, id) => {
          zipEntries.forEach(function (zipEntry, i) {
            console.log(empresa)
            // let ext = keys[i].split(".");
            // let archivo = `${i + 1}_Archivo_extra`;
            // if (Role[i] == 1) {
            //   archivo = `${i + 1}_Solicitud_capacitacion`;
            // }
            // if (Role[i] >= 20 && Role[i] < 30) {
            //   archivo = `${i + 1}_Recibo_aportacion`;
            // }
            // if (Role[i] >= 30 && Role[i] < 40) {
            //   archivo = `${i + 1}_Comprobante_pago_linea`;
            // }
            // if (Role[i] >= 40) {
            //   archivo = `${i + 1}_Planilla_ISSS`;
            // }
            // var newFileName = `${archivo}.${ext[1]}`;
            // newZip.addFile(newFileName, zipEntry.getData());
          });
        // });
        
        newZip.writeZip(output.path);
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
