-- ============================SECCION FORMULARIO =====================================--


--INSERT tb_psychology --
sql = `INSERT INTO tb_psychology(id_student, date, next_date, results, observations, status) VALUES (?,?,?,?,?,?)`
sql = `INSERT INTO tb_psychology(id_student, status) VALUES (?,?)`
--UPDATE tb_psychology --
sql = `UPDATE tb_psychology SET  date = ?, next_date = ?, results = ?, observations = ?, status = ? WHERE id_psychology = ?`
--DELETE tb_psychology --
sql = `DELETE tb_psychology WHERE id_psychology = ?`
--CHANGE STATUS tb_psychology --
sql = `UPDATE tb_psychology SET status=? WHERE id_psychology = ?`


--INSERT tb_reasons_psychology--
sql = `INSERT INTO tb_reasons_psychology(id_psychology, id_reason) VALUES (?,?)`
--UPDATE tb_reasons_psychology--
sql = `UPDATE tb_reasons_psychology SET id_reason=? WHERE id_reason_psychology = ? `--no creo que se utilice --
--DELETE tb_reasons_psychology--
sql = `DELETE tb_reasons_psychology WHERE id_reason_psychology = ?`


--INSERT tb_strategies_psychology--
sql = `INSERT INTO tb_strategies_psychology(id_strategy, id_psychology) VALUES (?,?)`
--UPDATE tb_strategies_psychology-- 
sql = `UPDATE tb_strategies_psychology SET id_strategy = ?,id_psychology = ? WHERE id_strategy_psychology = ?`
--DELETE tb_strategies_psychology--
sql = `DELETE tb_strategies_psychology WHERE id_strategy_psychology = ?`

-- ============================ READS =====================================--


--SELECT for detail table whit id_student
sql = `SELECT date, next_date, id_psychology FROM tb_psychology WHERE id_student = ? AND status = 0`


--SELECT FOR UPDATE FORM

--select tb_strategies_psychology
sql = `SELECT id_strategy_psychology, id_strategy FROM tb_strategies_psychology WHERE id_psychology = ?`
--select tb_reasons_psychology
sql = `SELECT id_reason, id_reason_psychology FROM tb_reasons_psychology WHERE id_psychology = ?`
--select tb_psychology
sql = `SELECT date, next_date, results, observations, status FROM tb_psychology WHERE id_psychology = ?`




--===========================UTILIZADOS========================================

-- SELECT for students table without   cadre 
sql = `SELECT carnet, Nombres, Apellidos, REPLACE(JSON_EXTRACT(json1, '$.Carrera'), '"','' ) as id_Carrera, 
REPLACE(JSON_EXTRACT(json1, '$.Sexo'), '"','' ) as genero, REPLACE(REPLACE(JSON_EXTRACT(json1, '$.FechaNac'), '"','' ),'-','/') as 
fechaNac, id FROM tb_ec_alumno`
--SELECT for students table whit cadre
sql = `SELECT carnet, Nombres, Apellidos, REPLACE(JSON_EXTRACT(json1, '$.Carrera'), '"','' ) as id_Carrera, 
REPLACE(JSON_EXTRACT(json1, '$.Sexo'), '"','' ) as genero, REPLACE(REPLACE(JSON_EXTRACT(json1, '$.FechaNac'), '"','' ),'-','/') as fechaNac, 
A.id FROM tb_ec_alumno as A INNER JOIN tb_psychology P on P.id_student = A.id;`
--ambos se tendra que ocnvertir de fechaNac a una edad con programación


--SELECT para cabecera de las paginas 
sql = `SELECT carnet, Nombres, Apellidos, REPLACE(JSON_EXTRACT(json1, '$.Carrera'), '"','' ) as 
id_Carrera, REPLACE(JSON_EXTRACT(json1, '$.Sexo'), '"','' ) as genero, 
REPLACE(JSON_EXTRACT(json1, '$.Escolaridad'), '"','' ) as nivel_academico, 
REPLACE(JSON_EXTRACT(json1, '$.EstadoF'), '"','' ) as estado_civil, 
REPLACE(JSON_EXTRACT(json1, '$.TelMovilPropio'), '"','' ) as telefono_movil, 
REPLACE(JSON_EXTRACT(json1, '$.Correo'), '"','' ) as correo, 
REPLACE(JSON_EXTRACT(json1, '$.direccion'), '"','' ) as direccion, 
REPLACE(REPLACE(JSON_EXTRACT(json1, '$.FechaNac'), '"','' ),'-','/') as fechaNac, id 
FROM tb_ec_alumno WHERE id = ?;`

--SELECT for details table
sql = `SELECT date, next_date, id_psychology FROM tb_psychology WHERE status = 0`