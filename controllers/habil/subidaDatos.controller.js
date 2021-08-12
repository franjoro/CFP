const pool = require("../../models/db");
const { upload, getFiles } = require("../../utils/s3");// Lo usaremos para subir u obtener archivos

const subidaHabil = {};

//SECCION DE ASOCIACIÓN DEL BUCKET CON LA SUBIDA DE DATOS
subidaHabil.archivos = async (req, res) => {
    if (!req.files) return res.json({ status: false, error: "FILE_NOT_EXIST" });
    Object.keys(req.files);
    const CursosCrud = req.body.curso;
    const cursos = JSON.parse(CursosCrud);
    const {
      empresa,
      CantidadPlanilla,
      CantidadRecibo,
      CantidadCancelacion,
    } = req.body;
    try {
      const promesas = [], inserts = [];
      let ext, fileContent;
      const formatExtension = (ext)=>{
       ext = ext[ext.length - 1].toLowerCase();
       if(ext == "jpg") ext = "jpeg";
       return ext;
      };
      cursos.forEach((curso, index) => {
        // SUBIR Ficha
        ext = formatExtension(req.files[`ficha${index}`].name.split("."));
        fileContent = Buffer.from(req.files[`ficha${index}`].data, "binary");
        promesas.push(
          upload(fileContent, Date.now(), ext, empresa, `ficha${index}`)
        );
  
        // SUBIR Recibo
        for (let i = 0; i < CantidadRecibo[index]; i++) {
          ext = formatExtension(req.files[`recibo${index}${i}`].name.split(".") );
          fileContent = Buffer.from(
            req.files[`recibo${index}${i}`].data,
            "binary"
          );
          promesas.push(
            upload(fileContent, Date.now(), ext, empresa, `recibo${index}${i}`)
          );
        }
      });
      const datos = await Promise.all(promesas);
  
      cursos.forEach((curso, index) => {
        let key;
        datos.forEach((element) => {
          if (element.posicion == `ficha${index}`) {
            key = element.key;
            inserts.push(
              pool.query(
                "INSERT INTO archivo_empresa_curso(s3key, Role, id_empresa, id_curso) VALUES(?,?,?,?) ",
                [key, 1, empresa, curso]
              )
            );
          }
        });
      });
      await Promise.all(inserts);
      return res.status(200).json({ status: true });
    } catch (error) {
      console.log(error);
      return res.json({ status: false, error });
    }
};

module.exports = subidaHabil;