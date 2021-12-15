// name: delete_controller_frequence_questions.js
// description: controller delete frecuqnce questions
// dependencies: pool
// create-date: 12/14/2021 for Osmaro Bonilla
// last update: 12/14/2021 for Osmaro Bonilla

// import dependencies
const pool = require("../../models/db");
// create constructor json
const remove = {};


remove.delete = (req,res)=>{
    try {
        const { id } = req.body;
        if(!id){
            return(res.status(400).json({'error': "empty_id"}));
        }
        pool.query('DELETE FROM tb_frequent_questions WHERE id = ?;',[id]).then(
            (response)=>{
                res.send(response);
            }
        )
    } catch (error) {
        return(res.send(error));
    }

};

module.exports = remove;

