/*@author: Osmaro Bonilla
  @description: Se realizan todas las consultas de lectura referentes a habil
  @see: Se utiliza en subidaDatoscontroller.js
  @param: Null*/
const pool = require("../../models/db");
const { getUserDataByToken } = require("../../middlewares/auth");
const readHabil = {};


/*@description: Consulta y creación de tabla para solicitudes habil
  @see: Se utiliza en cliente de habil
  @param: req, res, req.coockies.token*/
readHabil.curso_detalle_NoCtoznts = async (req, res) => {
    const usuario = getUserDataByToken(req.cookies.token);

    // VALIDAR si la peticion trae un codigo de curso
    const curso = req.params.id;
    const { programa, tipo } = req.params;

    if (!curso) return res.status(400).json({ error: "ID_NOT_EXIST" });
    if (!(tipo === "curso" || tipo === "oferta"))
        return res.status(400).json({ error: "TIPO_NOT_VALID" });
    try {

        //CONSULTA DE CURSOS DE HABIL Y NO COTIZANTES
        const queryCursos = `SELECT Nombre, Codigo_curso FROM tb_cursos where Estado = 1 AND id_programa = ?`;
        const cursosNoCotz = await pool.query(queryCursos,[programa]);

        //CONSULTA DE TABLA
        const countString ="SELECT COUNT(*) AS count FROM tb_habil_solicitudes where Codigo_curso = ? ";
        const count = await pool.query(countString,[curso]);
        let conteo = count[0].count;
        const queryString = `
        SELECT DISTINCT par.DUI as dui, REPLACE(JSON_EXTRACT(json1, '$.nit'), '"','' ) as nit , 
        par.Nombre as nombre, par.Telefono as telefono,par.Email as email, par.Genero as sexo, sol.id as idSolicitud, 
        sol.estado as estadoSolicitud, sol.Codigo_curso as id_curso FROM tb_habil_solicitudes AS sol 
        INNER JOIN tb_participante par on par.DUI = sol.documento WHERE sol.Codigo_curso = ? 
        AND (sol.estado = 0 OR sol.estado = 3 OR sol.estado = 4)`;
        //Agregamos la consulta de queryString con su parametro
        const query = await pool.query(queryString,[curso]);
        
        // Traer de bd Las empresas que estan matriculadas al curso y los alumnos asociados
        let typeQuery;
        if (tipo === "curso") {
        typeQuery = `SELECT  tb_cursos . Codigo_curso ,  tb_cursos . Nombre ,  tb_cursos . Date_inicio ,  tb_cursos . Date_fin ,  tb_cursos . Orden ,  tb_cursos . Agrupacion ,  tb_cursos . Horario ,  tb_cursos . CostoAlumno ,  tb_cursos . Factura ,  tb_instructor . Nombre AS instructor ,  tb_instructor . DUI AS Instructor_id , tb_cursos.Modalidad , tb_cursos.id_modalidad, tb_cursos.Documento , tb_cursos.id_documento , tb_cursos.Fechas   FROM  tb_instructor  INNER JOIN  tb_cursos  ON  tb_cursos . id_instructor  =  tb_instructor . DUI  WHERE tb_cursos . Codigo_curso  = ?  GROUP BY tb_cursos.Codigo_curso`;
        }
        if (tipo === "oferta") {
        typeQuery = `SELECT CONCAT(Nombre,' - ',Horario) AS Nombre , Codigo_curso  , Date_inicio , Horario, Fechas, Nombre AS CursoName , CostoAlumno AS costo , horas  FROM tb_cursos WHERE Codigo_curso  = ?`;
        }
        const statment = `SELECT tb_empresa.Nombre,tb_empresa.id_empresa AS codigo_empresa, union_curso_empresa.comentario AS comentario  FROM tb_empresa INNER JOIN union_curso_empresa ON tb_empresa.id_empresa = union_curso_empresa.id_empresa WHERE union_curso_empresa.id_curso = ? GROUP BY tb_empresa.id_empresa ORDER BY union_curso_empresa.id_union ;SELECT tb_participante.DUI, tb_participante.Nombre, tb_participante.Telefono, tb_participante.Email, union_matricula.id_empresa , union_matricula.id_matricula FROM tb_participante  INNER JOIN union_matricula ON union_matricula.id_participante = tb_participante.DUI WHERE union_matricula.id_curso = ? ; ${typeQuery}`;

        const empresas = await pool.query(statment, [curso, curso, curso]);
        // Formatear la informacion para que existan los alumnos adentro de un objeto de empresas
        const datos = [];
        empresas[0].forEach((element, i) => {
        const AlumnosArray = [];
        empresas[1].forEach((alumno) => {
            if (alumno.id_empresa === element.codigo_empresa) {
            AlumnosArray.push(alumno);
            }
        });
        datos[i] = {
            id: element.codigo_empresa,
            Empresa: element.Nombre,
            Alumnos: AlumnosArray,
            comentario: element.comentario,
            id_matricula: element.id_union,
        };
        i += 1;
        });
        // Responder
        return res.render("./habil/curso_detalleCtz", {
        datos,
        curso: empresas[2][0],
        programa,
        cAlumnos: empresas[1].length,
        data: usuario.data,
        tipo,
        query,
        conteo,
        cursosNoCotz
        });
    } catch (error) {
        return res.status(400).json(error);
    }
};

readHabil.readDet = async (req,res) => {
    const { idSolicitud } =req.params;
    try {
        const sqlJson1 =`SELECT 
        REPLACE(JSON_EXTRACT(json1, '$.dui'), '"','' ) as dui, 
        REPLACE(JSON_EXTRACT(json1, '$.nit'), '"','' ) as nit, 
        REPLACE(JSON_EXTRACT(json1, '$.nombres'), '"','' ) as nombres,
        REPLACE(JSON_EXTRACT(json1, '$.apellidos'), '"','' ) as apellidos,
        REPLACE(JSON_EXTRACT(json1, '$.sexo'), '"','' ) as sexo,
        REPLACE(JSON_EXTRACT(json1, '$.cfamilia'), '"','' ) as cfamilia,
        REPLACE(JSON_EXTRACT(json1, '$.estadoFamiliar'), '"','' ) as estadoFamiliar,
        REPLACE(JSON_EXTRACT(json1, '$.jefeDeHogar'), '"','' ) as jefeDeHogar,
        REPLACE(JSON_EXTRACT(json1, '$.nHijos'), '"','' ) as nHijos,
        REPLACE(JSON_EXTRACT(json1, '$.otProfecionBool'), '"','' ) as booltrabajoantes,
        REPLACE(JSON_EXTRACT(json1, '$.otProfecion'), '"','' ) as profesion,
        REPLACE(JSON_EXTRACT(json1, '$.depNacimiento'), '"','' ) as depNacimiento,
        REPLACE(JSON_EXTRACT(json1, '$.munNacimiento'), '"','' ) as munNacimiento,
        REPLACE(JSON_EXTRACT(json1, '$.fechNacimiento'), '"','' ) as fechNacimiento,
        REPLACE(JSON_EXTRACT(json1, '$.depDomicilio'), '"','' ) as depDomicilio,
        REPLACE(JSON_EXTRACT(json1, '$.munDomicilio'), '"','' ) as munDomicilio,
        REPLACE(JSON_EXTRACT(json1, '$.direccionDom'), '"','' ) as direccionDom,
        REPLACE(JSON_EXTRACT(json1, '$.telFijo'), '"','' ) as telFijo,
        REPLACE(JSON_EXTRACT(json1, '$.telMovil'), '"','' ) as telMovil,
        REPLACE(JSON_EXTRACT(json1, '$.email'), '"','' ) as email,
        REPLACE(JSON_EXTRACT(json1, '$.discapacidadBool'), '"','' ) as discapacidadBool,
        JSON_EXTRACT(json1, '$.discapacidad') as discapacidad,
        REPLACE(JSON_EXTRACT(json1, '$.otroText'), '"','' ) as textoDiscapacidad
        FROM tb_habil_solicitudes WHERE id = ?`;
        const dataJson1 = await pool.query(sqlJson1,[idSolicitud]);
        const sqlJson2 = `SELECT 
        REPLACE(JSON_EXTRACT(json2, '$.sabeleerEscribir'), '"','' ) as sabeleerEscribir, 
        REPLACE(JSON_EXTRACT(json2, '$.leerEscribir'), '"','' ) as leerEscribir, 
        REPLACE(JSON_EXTRACT(json2, '$.soloFirma'), '"','' ) as soloFirma, 
        REPLACE(JSON_EXTRACT(json2, '$.gradoFinalizado'), '"','' ) as gradoFinalizado, 
        REPLACE(JSON_EXTRACT(json2, '$.estudiaActualmente'), '"','' ) as estudiaActualmente, 
        REPLACE(JSON_EXTRACT(json2, '$.tiempoestudio'), '"','' ) as tiempoestudio, 
        REPLACE(JSON_EXTRACT(json2, '$.cursosPasados'), '"','' ) as cursosPasados, 
        REPLACE(JSON_EXTRACT(json2, '$.beneficioCursos'), '"','' ) as beneficioCursos, 
        REPLACE(JSON_EXTRACT(json2, '$.curso1'), '"','' ) as curso1, 
        REPLACE(JSON_EXTRACT(json2, '$.impartio1'), '"','' ) as impartio1, 
        REPLACE(JSON_EXTRACT(json2, '$.year1'), '"','' ) as year1, 
        REPLACE(JSON_EXTRACT(json2, '$.beneficio1'), '"','' ) as beneficio1, 
        REPLACE(JSON_EXTRACT(json2, '$.curso2'), '"','' ) as curso2, 
        REPLACE(JSON_EXTRACT(json2, '$.txtTitleOr'), '"','' ) as txtTitleOr, 
        REPLACE(JSON_EXTRACT(json2, '$.txtOtherEduc'), '"','' ) as txtOtherEduc, 
        REPLACE(JSON_EXTRACT(json2, '$.impartio2'), '"','' ) as impartio2, 
        REPLACE(JSON_EXTRACT(json2, '$.year2'), '"','' ) as year2, 
        REPLACE(JSON_EXTRACT(json2, '$.beneficio2'), '"','' ) as beneficio2, 
        REPLACE(JSON_EXTRACT(json2, '$.curso3'), '"','' ) as curso3, 
        REPLACE(JSON_EXTRACT(json2, '$.impartio3'), '"','' ) as impartio3, 
        REPLACE(JSON_EXTRACT(json2, '$.year3'), '"','' ) as year3, 
        REPLACE(JSON_EXTRACT(json2, '$.beneficio3'), '"','' ) as beneficio3, 
        REPLACE(JSON_EXTRACT(json2, '$.txtOtro'), '"','' ) as txtOtro, 
        JSON_EXTRACT(json2, '$.cursopositivo') as cursopositivo, 
        REPLACE(JSON_EXTRACT(json2, '$.nobeneficioc'), '"','' ) as nobeneficioc, 
        JSON_EXTRACT(json2, '$.actividades') as actividades, 
        REPLACE(JSON_EXTRACT(json2, '$.trabajaantes'), '"','' ) as trabajaantes, 
        REPLACE(JSON_EXTRACT(json2, '$.tiempoSinTrabajarselect'), '"','' ) as tiempoSinTrabajarselect, 
        REPLACE(JSON_EXTRACT(json2, '$.tipoempleo'), '"','' ) as tipoempleo, 
        REPLACE(JSON_EXTRACT(json2, '$.sectorDeTrabajo'), '"','' ) as sectorDeTrabajo, 
        REPLACE(JSON_EXTRACT(json2, '$.recibeIngresos'), '"','' ) as recibeIngresos, 
        REPLACE(JSON_EXTRACT(json2, '$.txtOtherWork'), '"','' ) as txtOtherWork, 
        REPLACE(JSON_EXTRACT(json2, '$.sectortrabajo'), '"','' ) as sectortrabajo, 
        JSON_EXTRACT(json2, '$.ingresos') as ingresos, 
        JSON_EXTRACT(json2, '$.espectativaLogro') as espectativaLogro, 
        REPLACE(JSON_EXTRACT(json2, '$.pertinencia'), '"','' ) as pertinencia
        FROM tb_habil_solicitudes WHERE id = ?`;
        const dataJson2 = await pool.query(sqlJson2,[idSolicitud]);
        const sqlJson3 = `SELECT 
        REPLACE(JSON_EXTRACT(json3, '$.nombreContacto'), '"','' ) as nombreContacto,
        REPLACE(JSON_EXTRACT(json3, '$.parentesco'), '"','' ) as parentesco,
        REPLACE(JSON_EXTRACT(json3, '$.direccionContacto'), '"','' ) as direccionContacto,
        REPLACE(JSON_EXTRACT(json3, '$.departcontact'), '"','' ) as departcontact,
        REPLACE(JSON_EXTRACT(json3, '$.municipiocontacto'), '"','' ) as municipiocontacto,
        REPLACE(JSON_EXTRACT(json3, '$.fijoContact'), '"','' ) as fijoContact,
        REPLACE(JSON_EXTRACT(json3, '$.movilContacto'), '"','' ) as movilContacto,
        REPLACE(JSON_EXTRACT(json3, '$.emailContacto'), '"','' ) as emailContacto
        FROM tb_habil_solicitudes WHERE id = ?`;
        const dataJson3 = await pool.query(sqlJson3,[idSolicitud]);
        return res.status(200).json({ 
            status: true,
            data: dataJson1 ,
            data2: dataJson2,
            data3: dataJson3
        });

    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = readHabil;