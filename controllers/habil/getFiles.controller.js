/*@author: Osmaro Bonilla
  @description: Se consiguen los archivos de S3 AWS para descargar
  @date: 20/08/2021*/
const ReadFiles = {};
const { getFiles } = require("../../utils/s3");

/*@description: Se descarga el archivo
  @see: Se utiliza en cliente de habil
  @param: req, res, req.coockies.token*/
ReadFiles.GetFiles = async (req, res) => {
    if (!req.body.key) return res.json({ status: false, error: "KEY_NOT_EXIST" });
    const key = req.body.key;
    try {
      const get = await getFiles(key);
      const path = `static/files/tmp/tmpfile.${get}`;
      return res.status(200).json({ status: true, path, ext: get });
    } catch (error) {
      console.log(error);
      return res.json({ status: false, error });
    }
};