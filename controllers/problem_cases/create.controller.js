// name: create.controller.js
// description: controller create in table tb_problem_cases
// dependencies: pool
// create-date: 12/14/2021 for Osmaro Bonilla
// last update: 12/14/2021 for Osmaro Bonilla

// import dependencies
const pool = require("../../models/db");
// create constructor json
const create = {};

create.add = (req,res)=>{
    try {
        const {
            name,
            email,
            phone,
            problem,
            description,
            idProgram
        } = req.body;
        if(!name){
            return(res.status(400).json({'error': "empty_name"}));
        }
        if(!email){
            return(res.status(400).json({'error': "empty_email"}));
        }
        if(!phone){
            return(res.status(400).json({'error': "empty_phone"}));
        }
        if(!problem){
            return(res.status(400).json({'error': "empty_problem"}));
        }
        if(!description){
            return(res.status(400).json({'error': "empty_description"}));
        }
        if(!idProgram){
            return(res.status(400).json({'error': "empty_program"}));
        }
        pool.query('INSERT INTO tb_problem_cases(name, email, phone, problem, description, id_program) VALUES (?,?,?,?,?,?)',
        [name,email,phone,problem,description,idProgram]).then(
            (response)=>{
                res.send(response);
            }
        )
    } catch (error) {
        return(res.send(error));
    }

};

module.exports = create;
