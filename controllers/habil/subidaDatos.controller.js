/*@author: Osmaro Bonilla
  @description: Controlador de subida de archivos de solicitudes habil
  @param: Null
  @*/
const pool = require("../../models/db");
const { uploadGlobal } = require("../../utils/s3Folder/s3_habil");// Lo usaremos para subir u obtener archivos
const subidaHabil = {};

//SECCION DE ASOCIACIÓN DEL BUCKET CON LA SUBIDA DE DATOS
subidaHabil.archivos = async (req, res) => {
  const {tipo} = req.params;
  let codigoTipo ;
  if(tipo == 'dui')
    codigoTipo = 0;
  if(tipo == 'nit')
    codigoTipo = 2;
  //Validamos que exista el file
    if (!req.files) return res.json({ status: false, error: "FILE_NOT_EXIST" });
    //Obtenemos la propiedad name del objeto req.files
    Object.keys(req.files);
    //Recolectamos las variables enviadas por el cliente
    const {
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
      for (let i = 0; i < cantidadDocumentos; i++) {
        //Se recibe la informacion del documento
        console.log(req.files);
        ext = formatExtension(req.files[`fileDocumentos${i}`].name.split("."));
        fileContent = Buffer.from(
          req.files[`fileDocumentos${i}`].data,
          "binary"
        );
        promesas.push(
          uploadGlobal(fileContent, Date.now(), ext, idSolicitud, `fileDocumentos${i}`, `participantes`)
        );
      }
      const datos = await Promise.all(promesas);
        
      //Asignamos 
      let key;
      let type;
      for (let i = 0; i < cantidadDocumentos; i++) {
        if(codigoTipo == 0){
          if(i == 0){
            type = 0;
          }else{
            type = 1;
          }
        }else{
          if(i == 2){
            type = 2;
          }else{
            type = 3;
          }
        }
        datos.forEach((element) => {
          if (element.posicion == `fileDocumentos${i}`) {
            key = element.key;
            inserts.push(
              pool.query(
                "INSERT INTO tb_habil_documentos( id_solicitud, s3key, estado, tipo ) VALUES (?,?,?, ?) ",
                [idSolicitud, key , true, type]
              )
            );
          }
        });
      }
      
      await Promise.all(inserts);
      return res.status(200).json({ status: true });
    }catch (error) {
      console.log(error);
      return res.json({ status: false, error });
    }
};

module.exports = subidaHabil;