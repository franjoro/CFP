/*
name: files controller 
description: send update and delete files in aws
dependencies: pool models/db,  getUserDataByToken /middlewares/auth, 
start-date: 26/11/2021 for OsmaroBonilla
last-update: 26/11/2021 for OsmaroBonilla
*/

const pool = require("../../models/db");
const { uploadGlobal } = require("../../utils/s3Folder/s3_habil");// Lo usaremos para subir u obtener archivos
const {deleteObject} = require("../../utils/s3");
const filesController = {};


filesController.deleteFile = async (req, res) => {
    const { key } = req.body;
    try {
      const deleteStatus = deleteObject(key);
      const deleteSql = pool.query(
        "DELETE FROM erstudentdocuments WHERE keyaws = ? ",
        [key]
      );
      const promisesStatus = await Promise.all([deleteStatus, deleteSql]);
      res.json({ status: true, promisesStatus }).status(200);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ status: false, error });
    }
};

filesController.sendFile = async (req,res) =>{

    if (!req.files) return res.json({ status: false, error: "FILE_NOT_EXIST" });
    Object.keys(req.files);
    try {
        const {
            name,
            idStudent,
            status,
            type,
            id
        } = req.body;
        console.log(id);
        console.log(name);
        console.log(type);
        //Creamos un arreglo para usar las promesas
        const promesas = [], instruction= [];
       
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
          //Se recibe la informacion del documento
        ext = formatExtension(req.files[`fileDocument`].name.split("."));
        fileContent = Buffer.from(req.files[`fileDocument`].data, "binary");
        promesas.push(uploadGlobal(fileContent, Date.now(), ext, idStudent, `fileDocument`, `students`));

        const datos = await Promise.all(promesas);
          
        //Asignamos 
        let key;
        datos.forEach((element) => {
            if (element.posicion == `fileDocument`) {
                key = element.key;
                if(type == 'insert'){
                    instruction.push(
                        pool.query(
                            "INSERT INTO erstudentdocuments(name, keyaws, id_student, status, createdAt, updatedAt) VALUES (?,?,?,?,?,?)",
                            [name, key, idStudent, status, Date.now(), Date.now()]
                        )
                    );
                }else{
                    instruction.push(
                        pool.query(
                            "UPDATE erstudentdocuments SET name = ?, keyaws= ? WHERE id = ?",
                            [name, key, id]
                        )
                    );
                }
                
            }
        });
        await Promise.all(instruction);
        return res.status(200).json({ status: true });
    }catch (error) {
        console.log(error);
        return res.json({ status: false, error });
    }
};


module.exports = filesController;