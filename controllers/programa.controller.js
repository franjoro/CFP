//declarar variable a exportar
const programa = {};

const { query } = require("../models/db");
//Requerimos pool de base de datos si es necesario
const pool = require("../models/db");

//Agregar un nuevo programa
programa.addPrograma = async (req, res) => {
  //Tratamiento de imagen
  try {
    //Validar que la imagen exista
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      //Cambiar nombre con fecha
      let file = req.files.file;
      var file_name = new Date().getTime() + "_" + file.name;
      //Mover el archivo
      file.mv("./public/img/uploads/" + file_name);
      const data = [req.body.nombre, file_name];
      //Hacer Insert
      const query = await pool.query(
        "INSERT INTO tb_programa(Nombre,ImgPortada,Estado) VALUES(?,?,1)",
        data
      );
      //send response
      res.redirect("/admin/programa");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

//Cargar la tabla general de programas
programa.loadTable = async (req, res) => {
  const data = await pool.query(
    "SELECT Nombre,ImgPortada,id_programa,Estado FROM tb_programa "
  );
  //enviar en json para datatable
  res.json({ data });
};

//Tabla de un encargado con un programa
programa.renderTablaUnion = async (req, res) => {
  try {
    //Requerir id de parametro
    let id = req.params.id;
    //Hacer consultas para validar si el programa existe; para llamar a los encargados existentes; llamar a los que no son encargados
    let c = await pool.query(
      `SELECT COUNT(*) AS c, Nombre FROM tb_programa WHERE id_programa = ?;
      SELECT tb_usuarios.Nombre, union_programa_usuario.id_usuario FROM tb_usuarios INNER JOIN union_programa_usuario ON union_programa_usuario.id_usuario = tb_usuarios.id_usuario WHERE union_programa_usuario.id_programa = ? ;
      SELECT id_usuario, Nombre FROM tb_usuarios WHERE Role=0 AND Estado=1 `,
      [id, id]
    );
    //formatear la respuesta
    let flag = { exist: c[0][0].c, name: c[0][0].Nombre };
    //Renderizar y mandar respuesta
    res.render("admin/union_programa_encargado", {
      data: flag,
      e: c[1],
      t: c[2],
      id,
    });
  } catch (error) {
    console.log(error);
    //Error si no encuentra programa
    return res.status(400).send("Not Found");
  }
};

//Agregar encargado a un programa
programa.addEncargado = async (req, res) => {
  try {
    //Formatear data
    data = [req.body.name, req.body.id];

    //Verificar si existe ya la union
    let exist = await pool.query(
      "SELECT COUNT(*) AS c FROM union_programa_usuario WHERE id_usuario =?  AND id_programa = ?",
      data
    );
    //Si ya existe returnar a la misma pag
    if (exist[0].c) return res.redirect(`/admin/programa/id${data[1]}`);
    //Ingresar si no existe
    await pool.query(
      "INSERT INTO union_programa_usuario(id_usuario,id_programa) VALUES(?,?)",
      data
    );
    //Retornar
    return res.redirect(`/admin/programa/id${data[1]}`);
  } catch (error) {
    console.log(error);
    //Error si no encuentra programa
    return res.status(400).send(error);
  }
};

//Desvincular programa e instructor
programa.deleteinstructor = async (req, res) => {
  data = [req.body.usuario, req.body.programa];
  try {
    await pool.query(
      "DELETE FROM union_programa_usuario WHERE id_usuario = ? AND id_programa = ?",
      data
    );
    res.status(200);
  } catch (error) {
    res.status(400).send(error);
  }
};


//Actualizar info del programa
programa.updatePrograma = async (req, res) => {
  data = [
    req.body.nombreUpdate,
    req.body.estadoUpdate,
    req.body.idUpdate
  ]
  try {
    let query = await pool.query("UPDATE tb_programa SET Nombre = ? , Estado = ?  WHERE id_programa = ?", data);
    
    if(query) return res.status(200).send("ok");
  } catch (error) {
    return res.status(400).send(error);
  }


};

module.exports = programa;
