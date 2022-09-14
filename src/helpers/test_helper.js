const pool = require('../configs/db')

const dbUSERS = async () => {
 const users = await pool.query("SELECT * FROM USERS");
 return users.rows;
}

const dbCOURSES = async () => {
 const courses =  await pool.query("SELECT * FROM COURSES");
 return courses.rows;
}

module.exports = { dbUSERS, dbCOURSES };