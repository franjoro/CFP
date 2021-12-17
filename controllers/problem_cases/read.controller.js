// name: read.controller.js
// description: controller read in table tb_problem_cases
// dependencies: pool
// create-date: 16/12/2021 for Osmaro Bonilla
// last update: 16/12/2021 for Osmaro Bonilla

const pool = require("../../models/db");
const { getUserDataByToken } = require("../../middlewares/auth");
// create constructor json
const read = {};

read.findForProgram = async(req,res)=>{
    try {
        // recolect req.body
        const { idProgram } = req.params;
        // validate const
        if(!idProgram){
            return(res.status(400).json({'error': "empty_program"}));
        }
        // execute sql query
        const data = await pool.query('SELECT id, name, email, phone, problem, description, timestamp FROM tb_problem_cases WHERE id_program = ?',
        [idProgram]);
        // send response
        return res.json({data});
    } catch (error) {
        return(res.send(error));
    }

};

read.renderDetails = async(req,res) =>{
    try {
        const { idProblem } = req.params;  
        const usuario = getUserDataByToken(req.cookies.token);
        if(!idProblem){
            return(res.status(400).json({'error':'empty_problem'}));
        }
        const dataProblem = await pool.query(`SELECT name, email, phone, problem, description, timestamp FROM tb_problem_cases WHERE id = ?`,[idProblem]);
        const dataDetails = await pool.query(`SELECT id, key_aws FROM tb_problem_cases_imgs WHERE id_problem_case = ?`,[idProblem]);
        res.render("./problem_cases/details", {
            dataProblem,
            dataDetails,
            data: usuario.data,
          });
    } catch (error) {
        console.log(error);
        return(res.send(error));
    }
};

module.exports = read;
