// declarar variable a exportar
const habil = {};

// Requerimos pool de base de datos si es necesario
const pool = require("../models/db");

habil.main = (req, res) => {
    res.render("ec/formulario");
};

habil.carreras = async (req, res) => {
    try {
        const carrera = await pool.query("SELECT * FROM tb_ec_carrera");
        res.json(carrera).status(200);
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }

};

habil.grupos = async (req, res) => {
    try {
        const {carrera} = req.params;
        const grupos = await pool.query("SELECT * FROM tb_ec_grupo WHERE id_carrera = ?", [carrera]);
        res.json(grupos).status(200);
    } catch (error) {
        console.log(error);
        res.json({ status: false, error }).status(400);
    }
};

module.exports = habil;
