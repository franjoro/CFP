// name: read.controller.js
// description: controller read in table tb_problem_cases
// dependencies: pool
// create-date: 16/12/2021 for Osmaro Bonilla
// last update: 16/12/2021 for Osmaro Bonilla

// create constructor json
const files = {};

files.sendFile = async()=>{

    const {idProblem} = req.params;
    if (!req.files) return res.json({ status: false, error: "FILE_NOT_EXIST" });
    Object.keys(req.files);
    try {
        //Creamos un arreglo para usar las promises y los inserts
        const promises = [], inserts = [];
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
          promises.push(
            uploadGlobal(fileContent, Date.now(), ext, idSolicitud, `fileDocumentos${i}`, `participantes`)
          );
        }
        const datos = await Promise.all(promises);
        //Asignamos 
        let key;
        for (let i = 0; i < cantidadDocumentos; i++) {
          datos.forEach((element) => {
            if (element.posicion == `fileDocumentos${i}`) {
              key = element.key;
              inserts.push(
                pool.query(
                  "INSERT INTO tb_habil_documentos( id_solicitud, s3key, estado, tipo ) VALUES (?,?,?, ?) ",
                  [idSolicitud, key , true, codigoTipo]
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

module.exports = files;
