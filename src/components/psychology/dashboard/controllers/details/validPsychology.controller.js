const validPsychology = {}
const { getUserDataByToken } = require("../../../../../../middlewares/auth");
const pool = require("../../../../../../models/db");



validPsychology.validDate = async (req,res)=>{
    const {tipo, date, next_date, idPsychology} = req.params; 

    try {
        if(tipo == 'create'){
            const sql = `SELECT COUNT(*) as count FROM tb_psychology WHERE (date = ? OR next_date = ?);`
            const params = [date,date];
            const count = await pool.query(sql,params);
            const dataCount = count[0].count;
            return res.json({
                dataCount
            });
        }else{
            const sql = `SELECT COUNT(*) as count FROM tb_psychology WHERE (date = ? OR next_date = ?) AND id_psychology not in (?)`
            const sql1 = `SELECT COUNT(*) as count FROM tb_psychology WHERE (date = ? OR next_date = ?) AND id_psychology not in (?)`
            const params = [date,date,idPsychology] ;
            const params1 = [next_date,next_date, idPsychology];
            const count = await pool.query(sql,params);
            const count1 = await pool.query(sql1,params1);
            const dataCount = count[0].count;
            const dataCount1 = count1[0].count;
            console.log('conteo');
            console.log(count);
            console.log('conteo1');
            console.log(count1);
            return res.json({
                dataCount,
                dataCount1
            });
        }
    } catch (error) {
         //return diferents errors
         console.log(error)
        return res.status(400).json(error);
    }
};

module.exports = validPsychology;