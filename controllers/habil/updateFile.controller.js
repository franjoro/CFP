/*@author: Osmaro Bonilla
  @description: Controlador de subida de archivos de solicitudes habil
  @param: Null
  @*/
  const pool = require("../../models/db");
  const { uploadGlobal } = require("../../utils/s3Folder/s3_habil");// Lo usaremos para subir u obtener archivos
  const updateFile = {};
  
  //SECCION DE ASOCIACIÓN DEL BUCKET CON LA SUBIDA DE DATOS
  updateFile.archivos = async (req, res) => {
    //Validamos que exista el file
      if (!req.files) return res.json({ status: false, error: "FILE_NOT_EXIST" });
      //Obtenemos la propiedad name del objeto req.files
      Object.keys(req.files);
      //Recolectamos las variables enviadas por el cliente
      const {
        idSolicitud,
        cantidadDocumentos,
        idDocumento,
      } = req.body;
      
      try {
        //Creamos un arreglo para usar las promesas y los inserts
        const promesas = [], updates = [];
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
        for (let i = 0; i < cantidadDocumentos; i++) {
          //Se recibe la informacion del documento
          console.log(req.files);
          ext = formatExtension(req.files[`fileDocumentos`].name.split("."));
          fileContent = Buffer.from(
            req.files[`fileDocumentos`].data,
            "binary"
          );
          promesas.push(
            uploadGlobal(fileContent, Date.now(), ext, idSolicitud, `fileDocumentos`, `participantes`)
          );
        }
        const datos = await Promise.all(promesas);
          
        //Asignamos 
        let key;
        for (let i = 0; i < cantidadDocumentos; i++) {
          datos.forEach((element) => {
            if (element.posicion == `fileDocumentos`) {
              key = element.key;
              updates.push(
                pool.query(
                  "UPDATE tb_habil_documentos SET s3key= ? WHERE id= ?",
                  [key , idDocumento]
                )
              );
            }
          });
        }
        
        await Promise.all(updates);
        return res.status(200).json({ status: true });
      }catch (error) {
        console.log(error);
        return res.json({ status: false, error });
      }
  };
  
  module.exports = updateFile;