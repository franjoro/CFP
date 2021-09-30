// Import reueriments
require("dotenv").config();
const AWS = require("aws-sdk");
const zipCourse = require("../../controllers/habil/zip.controller");
const AdmZip = require("adm-zip");
// Config const AWS
AWS.config.update({ region: "us-west-2" });
const s3 = new AWS.S3({
  accessKeyId: process.env.AWSID,
  secretAccessKey: process.env.AWSKEY,
  apiVersion: "2006-03-01",
});

// create json zip for after export
zipHbil={};

//name: createZipHabil
// date: 30/09/2021
zipHbil.createZipHabil = (folder,data) =>{
    return new Promise(async (resolve, reject) => {
    const fs = require("fs");
    const join = require("path").join;
    const s3Zip = require("s3-zip");
    const output = fs.createWriteStream(
        join(__dirname, "file_course_habil.zip")
    );
    let keys = [];
    data.forEach(element =>{
        keys.push(element.s3key);
    });
    console.log(data);
    s3Zip
        .archive({ s3, bucket: process.env.BUCKET }, folder, keys)
        .pipe(output)
        .on("finish", () => {
        const zip = new AdmZip(output.path);
        const zipEntries = zip.getEntries();
        const newZip = new AdmZip();
        zipEntries.forEach(function (zipEntry, i) {
            let elementPath , roleName; 
            data.forEach((element, id) => {
            let fileName = element.s3key.split("/");
            fileName = fileName[3];
            if (zipEntry.entryName == fileName) {
                ext = element.s3key.split(".");
                return (elementPath = (element.nombre+' '+ element.apellidos));
            }
            });
            let archivo = `${elementPath}/${i + 1}_Documentacion`;
            let newFileName = `${archivo}.${ext[1]}`;
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

module.exports = zipHbil;