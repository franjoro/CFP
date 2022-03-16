// declarar variable a exportar
const instructor = {};

// Requerimos pool de base de datos si es necesario
const pool = require('../models/db');

// const mailer = require ('../utils/mailer');

// Tabla principal de instructores
instructor.table = async (req, res) => {
    const status = req.params.estado;
    // validamos que venga un estado de instructor activo o inactivos
    if (!status) return res.status(400).json({ error: "Not_status" });
    // Hacemos consulta y devolvemos data
    try {
      const data = await pool.query("SELECT tb_instructor.* , tb_categoria_instructores.Categoria AS Nombre_categoria FROM tb_instructor INNER JOIN tb_categoria_instructores  ON tb_instructor.Categoria = tb_categoria_instructores.id WHERE Estado = ? ", [
        status,
      ]);
      return res.json({ data });
    } catch (error) {
      return res.status(400).json({ error });
    }
};
// Cambiar estado de activo a inactivo
instructor.changeEstado = async (req, res) => {
    // validar codigo y estado
    let estadoCambio = 1;
    if (req.body.estado === 1) estadoCambio = 0;
    const data = [estadoCambio, req.body.dui];
    try {
     await pool.query(
        "UPDATE tb_instructor SET Estado= ? WHERE DUI = ? ",
        data
      );
      return  res.json({ status: true });
    } catch (error) {
      return res.status(400).json({ status: false, error });
    }
  };

// agregar nueva empresa
instructor.add = async (req, res) => {
    if (!req.body.name || ! req.body.DUI)
      return res.status(400).json({ status: false, error: "empty_name" });
    try {
      let errors=[];
      const data = [
        req.body.DUI,
        req.body.NIT,
        req.body.name,
        req.body.email,
        req.body.tel,
        req.body.categoria,
        req.body.fecha_nacimiento,
        req.body.sexo,
        req.body.estado_civil,
        req.body.departamento_domicilio	,
        req.body.profesion,
        req.body.direccion,
        req.body.departamento_emision,
        req.body.municipio_emision,
        req.body.fecha_emision,
      ];
      // console.log(data);
      if(!req.body.fecha_nacimiento || req.body.fecha_nacimiento == '')
        errors.push("No debe dejar el campo fecha de nacimiento vacio");
      if(!req.body.sexo || req.body.sexo == '')
        errors.push("No debe dejar el campo sexo vacio");
      if(!req.body.estado_civil || req.body.estado_civil == '')
        errors.push("No debe dejar el campo estado civil vacio");    
      if(!req.body.departamento_domicilio || req.body.departamento_domicilio == '')
        errors.push("No debe dejar el campo departamento domicilio vacio");    
      if(!req.body.profesion || req.body.profesion == '')
        errors.push("No debe dejar el campo profesión domicilio vacio");  
      if(!req.body.direccion || req.body.direccion == '')
        errors.push("No debe dejar el campo direccion domicilio vacio");    
      if(!req.body.departamento_emision || req.body.departamento_emision == '')
        errors.push("No debe dejar el campo departamento emisión emisión vacio");   
      if(!req.body.municipio_emision || req.body.municipio_emision == '')
        errors.push("No debe dejar el campo municipio emisión vacio");    
      if(!req.body.fecha_emision || req.body.fecha_emision == '')
        errors.push("No debe dejar el campo fecha emisión vacio");    
      // return errors if exist
      if(errors.length > 0)
      return (res.json({errors: errors, status:false}));   
      await pool.query(
        `INSERT INTO 
        tb_instructor(DUI,NIT,Nombre,Email,Telefono,Estado,Categoria,fecha_nacimiento,sexo,estado_civil,departamento_domicilio,profesion,direccion,departamento_emision,municipio_emision,fecha_emision) 
        VALUES(?,?,?,?,?,1,?,?,?,?,?,?,?,?,?,?)`,
        data
      );
      return res.json({ status: true });
    } catch (error) {
      return res.status(400).json({ status: false, error });
    }
  };

  instructor.editar = async (req, res) => {
    if (!req.body.name_editar  || !req.body.DUI_editar)
      return res.status(400).json({ status: false, error: "empty_name" });
    const data = [
      req.body.name_editar,
      req.body.email_editar,
      req.body.tel_editar,
      req.body.DUI_editar,

      req.body.categoria_editar,
      req.body.fecha_nacimiento_editar,
      req.body.sexo_editar,
      req.body.estado_civil_editar,
      req.body.departamento_domicilio_editar	,
      req.body.profesion_editar,
      req.body.direccion_editar,
      req.body.departamento_emision_editar,
      req.body.municipio_emision_editar,
      req.body.fecha_emision_editar,
    ];
    try {
      await pool.query(
        "UPDATE tb_instructor SET Nombre = ?, Email = ? , Telefono = ? WHERE DUI = ?",
        data
      );
      return res.json({ status: true });
    } catch (error) {
       return res.status(400).json({ status: false, error });
    }
  };

module.exports = instructor;
