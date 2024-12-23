const mysql = require("mysql");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'taskmaster',
});

// Check connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Failed to connect to the database:", err.message);
    } else {
        console.log("DB connected successfully");
        connection.release(); // Release the connection back to the pool
    }
});

module.exports = pool;
