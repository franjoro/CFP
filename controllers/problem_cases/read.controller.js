// name: read.controller.js
// description: controller read in table tb_problem_cases
// dependencies: pool
// create-date: 16/12/2021 for Osmaro Bonilla
// last update: 16/12/2021 for Osmaro Bonilla

// import dependencies
const pool = require("../../models/db");
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

module.exports = read;
