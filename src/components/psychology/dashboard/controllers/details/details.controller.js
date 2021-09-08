// declarar variable a exportar
const details = {};
const { isEmail, isEmpty } = require("validator");
// Requerimos pool de base de datos si es necesario
const pool = require("../../../../../../models/db");
const { getUserDataByToken } = require("../../../../../../middlewares/auth");
// Requremimos utils encriptador

// details.main = async (req, res) => {
//   const usuario = getUserDataByToken(req.cookies.token);
//   try {
//     // let sql;
//     // if(idPrograma != undefined){
//     //    sql =  `SELECT 
//     //   Codigo_curso as codigo_curso, Nombre as nombre, Date_inicio as fecha_inicio, Date_fin as fecha_fin, Horario as horario, 
//     //   Fechas as fechas FROM tb_cursos WHERE id_programa = ? and (Estado = 15 );`;
//     // }else{
//     //    sql =  `SELECT 
//     //   Codigo_curso as codigo_curso, Nombre as nombre, Date_inicio as fecha_inicio, Date_fin as fecha_fin, Horario as horario, 
//     //   Fechas as fechas FROM tb_cursos WHERE (Estado = 15 OR Estado = 5 )`;
//     // }
    
//     // const cursos = await pool.query(sql,[idPrograma]);
//     // return res.render("index", {
//     //   data: cursos,
//     //   idPrograma
//     // });
//     return res.render('psychology/dashboard', {
//       data: usuario.data,
//     });
//   } catch (error) {
//     return res.status(400).json(error);
//   }
// };



details.detailsStudent = async (req,res) =>{
    const {idStudent} = req.params; 
    const sql = `SELECT carnet, Nombres, Apellidos, C.Nombre as nombreCarrera,
                REPLACE(JSON_EXTRACT(json1, '$.Sexo'), '"','' ) as genero, 
                REPLACE(JSON_EXTRACT(json1, '$.Escolaridad'), '"','' ) as nivel_academico, 
                REPLACE(JSON_EXTRACT(json1, '$.EstadoF'), '"','' ) as estado_civil, 
                REPLACE(JSON_EXTRACT(json1, '$.TelMovilPropio'), '"','' ) as telefono_movil, 
                REPLACE(JSON_EXTRACT(json1, '$.Correo'), '"','' ) as correo, 
                REPLACE(JSON_EXTRACT(json1, '$.direccion'), '"','' ) as direccion, 
                REPLACE(REPLACE(JSON_EXTRACT(json1, '$.FechaNac'), '"','' ),'-','/') as fechaNac, A.id 
                FROM tb_ec_alumno A INNER JOIN tb_ec_carrera C on C.id = REPLACE(JSON_EXTRACT(json1, '$.Carrera'), '"','' ) WHERE A.id = ?`;
    const params = [idStudent];
    
    try {
        const data = await pool.query(sql, params);
        const datos = {
            carnet: data[0].carnet,
            nombres: data[0].Nombres,
            apellidos: data[0].Apellidos,
            carrera: data[0].nombreCarrera,
            genero: data[0].genero,
            nivel_academico: data[0].nivel_academico,
            estado_civil: data[0].estado_civil,
            telefono_movil: data[0].telefono_movil,
            correo: data[0].correo,
            direccion: data[0].direccion,
            fechaNac: data[0].fechaNac,
        };
        return res.json({ 
            datos
         });
    } catch (error) {
        return res.status(400).json(error);
    }
};

details.detailsTable = async (req,res) =>{
    const {idStudent} = req.params; 
    const sql = `SELECT date, next_date, id_psychology, status FROM tb_psychology WHERE id_student = ? AND status = 0;`;
    const params = [idStudent];
    try {
        const data = await pool.query(sql, params);
        return res.json({ 
            data
         });
    } catch (error) {
        return res.status(400).json(error);
    }
};


module.exports = details;
