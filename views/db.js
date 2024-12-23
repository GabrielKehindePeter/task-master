
const { Client } = require('pg');

// connect to db

const db = new Client({
  host: 'localhost',
  user: 'postgres',
  database: 'testdb',
  password: 'root'
});

const connect = db.connect()

db.query("SELECT * FROM students",(err,rows)=>{
    if(err){
        console.log(err)
    }else{
        console.log(rows.rows)
    }
})
