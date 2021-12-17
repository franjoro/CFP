// name: read.controller.js
// description: controller read in table tb_problem_cases
// dependencies: pool
// create-date: 16/12/2021 for Osmaro Bonilla
// last update: 16/12/2021 for Osmaro Bonilla

// create constructor json
const { uploadGlobal } = require("../../utils/s3Folder/s3_habil");// Lo usaremos para subir u obtener archivos
const pool = require("../../models/db");


const files = {};

files.sendFile = async(req,res)=>{

    const {idProblem} = req.body;
    if (!req.files) return res.json({ status: false, error: "FILE_NOT_EXIST" });
    Object.keys(req.files);
    try {
        //Creamos un arreglo para usar las promises y los inserts
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
        for (let i = 0; i < 1; i++) {
          //Se recibe la informacion del documento
          ext = formatExtension(req.files[`fileDocumentos`].name.split("."));
          fileContent = Buffer.from(
            req.files[`fileDocumentos`].data,
            "binary"
          );
          promesas.push(
            uploadGlobal(fileContent, Date.now(), ext, idProblem, `fileDocumentos`, `casos-especiales`)
          );
        }
        const datos = await Promise.all(promesas);
          
        //Asignamos 
        let key;
        for (let i = 0; i < 1; i++) {
          datos.forEach((element) => {
            if (element.posicion == `fileDocumentos`) {
              key = element.key;
              inserts.push(
                pool.query(
                  "INSERT INTO tb_problem_cases_imgs(key_aws, id_problem_case) VALUES (?,?);",
                  [key , idProblem]
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
