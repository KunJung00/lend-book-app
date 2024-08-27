import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host:"202.28.34.197",
    user:"aiya_borrowbook",
    password:"aiya_borrowbook",
    database:"aiya_borrowbook",
    waitForConnections:true
})

export default pool