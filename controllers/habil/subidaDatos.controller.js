const pool = require("../../models/db");
const { uploadGlobal, getFiles } = require("../../utils/s3");// Lo usaremos para subir u obtener archivos
// const fs = require("fs");

const subidaHabil = {};

//SECCION DE ASOCIACIÓN DEL BUCKET CON LA SUBIDA DE DATOS
subidaHabil.archivos = async (req, res) => {
  //Validamos que exista el file
    if (!req.files) return res.json({ status: false, error: "FILE_NOT_EXIST" });
    //Obtenemos la propiedad name del objeto req.files
    Object.keys(req.files);
    //Recolectamos las variables enviadas por el cliente
    const {
      documento1,
      documento2,
      idSolicitud,
      cantidadDocumentos
    } = req.body;
    
    try {
      //Creamos un arreglo para usar las promesas y los inserts
      const promesas = [], inserts = [];
      //Usaremos estas variables para validar las extensiones en el servidor
      let ext, fileContent;
      //formateamos las extensiones
      const formatExtension = (ext)=>{
       ext = ext[ext.length - 1].toLowerCase();
       if(ext == "jpg") ext = "jpeg";
       return ext;
      };

      // SUBIR documentos
      //Hacemos un for contando la cantidad de documentos que se enviaran
      //Se le da formato a la extansion del file
      ext = formatExtension(req.files[`fileDocumentos`].name.split("."));
      //Se recibe la informacion del documento
      fileContent = Buffer.from(
        req.files[`fileDocumentos`].data,
        "binary"
      );
      promesas.push(
        uploadGlobal(fileContent, Date.now(), ext, idSolicitud, `fileDocumentos`, `participantes`)
      );
      const datos = await Promise.all(promesas);
  
      // cursos.forEach((curso, index) => {
      //   let key;
      //   datos.forEach((element) => {
      //     if (element.posicion == `ficha${index}`) {
      //       key = element.key;
      //       inserts.push(
      //         pool.query(
      //           "INSERT INTO archivo_empresa_curso(s3key, Role, id_empresa, id_curso) VALUES(?,?,?,?) ",
      //           [key, 1, empresa, curso]
      //         )
      //       );
      //     }
      //   });
      // });
      // await Promise.all(inserts);
      return res.status(200).json({ status: true });
    }catch (error) {
      console.log(error);
      return res.json({ status: false, error });
    }
};

module.exports = subidaHabil;