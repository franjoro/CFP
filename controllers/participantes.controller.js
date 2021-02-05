//declarar variable a exportar
const participantes = {};

//Requerimos pool de base de datos si es necesario
const pool = require('../models/db')

//const mailer = require ('../utils/mailer');


participantes.main = (req,res) =>{
    res.render('./admin/participantes');
}

participantes.loadTable = async (req, res) => {
    const data = await pool.query(
      "SELECT * FROM tb_participante"
    );
    res.json({ data });
  };
  

module.exports = participantes;