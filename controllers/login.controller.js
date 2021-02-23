// declarar variable a exportar
const login = {};
const { firmar, getUserDataByToken } = require("../middlewares/auth");
const pool = require("../models/db");
const { desincriptar } = require("../utils/decrypt");


// Render vista de login y reiniciamos el jwt
login.renderIndex = (req, res) => {
  // verificamos si existe sesion
  const token = req.header.auth;
  if(token){ 
    const userData = getUserDataByToken(token).data;
    // PENDIENTE DE CAMBIAR =====================================================
    if(userData.Role == 1) return res.redirect('/admin/programa')
    if(userData.Role == 0) return res.redirect('/admin/programa')
  }
  req.header.auth = "";
  res.render("login");
};




// Login handler
login.signin = async (req, res) => {
  try {
    // verificamos si existe el usuario y traemos data en caso si
    let data = await pool.query("SELECT Nombre,Password,Estado,Role FROM tb_usuarios WHERE id_usuario = ? ", req.body.username);
    // Error si no existe
    if(!Array.isArray(data) || !data.length) return res.status(400).json({error: "ERROR_NOT_EXIST",status:false});
    // Error si esta invalido
    if(!data[0].Estado) return res.status(400).json({error:"ERROR_ESTADO",status:false});
    // Verificamos contraseña 
    if(!await desincriptar(req.body.password,data[0].Password)) return res.status(400).json({error:"ERROR_PASSWORD",status:false});
    // Creamos JWT
    data = data[0];
    const payload = {Nombre: data.Nombre, Role: data.Role , usuario: req.body.username};
    const token = firmar(payload)
    res.cookie('token', token)
    res.status(200).json({status:true,role:data.Role});
} catch (error) {
    res.status(400).json({error,status:false});
  }
};


login.signout = async (req, res) => {
  req.header.auth = "";
  res.redirect("/");
}


module.exports = login;
