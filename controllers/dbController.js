const mysql = require ("mysql");

const pool = mysql.createPool({
    'host':'localhost',
    'user':'root',
    'password':'',
    'database':'taskmaster'
});
if(pool.connect){
    console.log("db connected")
}else{
    console.log("fail to connect")
}