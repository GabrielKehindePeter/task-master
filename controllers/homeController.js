const {Client} = require ('pg')
const {v4: uuidv4} = require ( 'uuid' );
const crypto = require('crypto');
const { password } = require('pg/lib/defaults');

const mysql = require ("mysql");

const pool = mysql.createPool({
    'host':'localhost',
    'user':'root',
    'password':'',
    'database':'taskmaster'
});


// const db = new Client({
//     host:'localhost',
//     user:'postgres',
//     password:'root',
//     database:'taskman'
//     })
    
    // const connect = db.connect();
    
    
// controller for index
exports.index = (req,res)=>{
    if(!(req.session.email && req.session.password)){
        res.redirect("/signin");
    }else{

        var user_id = req.session.user_id;

        pool.query("SELECT * FROM task WHERE user_id = ? ORDER BY stamp_date DESC LIMIT 5", [user_id], (err, rows) => {
            if (!err) {
                res.render("index", {
                    title: "Home",
                    session: req.session,
                    row_num: rows.length,
                    data: rows, // Use rows directly here
                });
            } else {
                console.log(err);
                res.render("error", { title: "Error", message: "Could not retrieve tasks." });
            }
        });
        

        // res.render("index",{"title":"Home"})
    }
    
}

// login
exports.signin = (req,res)=>{
    res.render("signin",{"title":"Signin"})
}

// register
exports.signup = (req,res)=>{
    res.render("signup",{"title":"Signup"})
}

// user profile
exports.profile = (req,res)=>{
    if(!(req.session.email && req.session.password)){
        res.redirect("/signin");
    }else{
        res.render("profile",{"title":"User Profile","session":req.session});
    }
    
}

// process signup
exports.process_signup = (req,res)=>{
    if(!(req.session.email && req.session.password)){
        res.redirect("/signin");
    }
    var full_name = req.body.full_name;
    var email = req.body.email;
    var password = req.body.password;
    var user_id = uuidv4();
    var hashpassword = crypto.createHash('md5').update(password).digest('hex');

    // console.log(hashpassword)
        // save task
        pool.query("INSERT INTO users(user_id,full_name, email,password, reg_date) VALUES(?, ?, ?, ?,NOW())",[user_id, full_name, email, hashpassword],(err, rows) => {
                if (err) 
                    {
                    console.error("Error executing query:", err.message);
                } 
                console.log(rows.affectedRows);
                if(rows.affectedRows > 0 ){
                    
                    req.session.full_name = full_name;
                    req.session.email = email;
                    req.session.user_id = user_id;
                    req.session.password = hashpassword;
                    res.redirect("/")   
                }
                    }
        );
}

// process login

exports.process_signin = (req,res)=>{
    var email = req.body.email;
    var password  = req.body.password;
    var hashpassword = crypto.createHash('md5').update(password).digest('hex');
    
    
    
    
    
    
    pool.query("SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1", [email, hashpassword], (err, rows) => {
        if (err) {
            console.log(err);
            res.render("signin", { title: "Signin", msg: "Bad credentials supplied" });
        } else {
            if (rows.length > 0) {
                const user = rows[0]; // Access the first (and only) row
                console.log(user.full_name); // Access the `full_name` field
                
                req.session.full_name = user.full_name;
                req.session.user_id = user.user_id;
                req.session.email = email;
                req.session.password = hashpassword;
                res.redirect('/');
            } else {
                console.log("No user found with the provided credentials.");
                res.render("signin", { title: "Signin", msg: "Bad credentials supplied" });
            }
        }
    });
    
    
    
    
    
    
    
    
    
    // pool.query("SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1",[email,hashpassword],(err,rows)=>{
    //     if(err){
    //         console.log(err)
    //         res.render("signin", { "title": "Signin", "msg": "Bad credecials supply" });
    //     }else{
    //     console.log(rows.full_name);
    //         console.log(result);
    //         // var user = result.RowDataPacket.full_name;
    //         // console.log(user)
    //         // req.session.full_name = user.full_name;
    //         // req.session.user_id = user.user_id;
    //         // req.session.email = email;
    //         // req.session.password = hashpassword;
    //         // res.redirect('/')
            
    //         // var msg = "Bad credecials supply";
    //     }
        // else{
        //     res.render("signin", { "title": "Signin", "msg": "Bad credecials supply" });

        //     // res.send('bad deatils')
        // }
//     })
}

// update profile

exports.update_profile = (req,res)=>{
    
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var address = req.body.address;
    var user_id = req.params.id;

    pool.query("SELECT * FROM users WHERE user_id = ?",[user_id],(err,rows)=>{
        if(!err){
            if(rows.length > 0){
                pool.query("UPDATE users SET full_name =?,phone=?, email=?, address=? LIMIT 1",[name,phone,email,address],(err,rows)=>{
                    if(!err){
                        console.log(user_id)
                        // console.log(rows.affectedRows)
                        res.render("profile",{title:"Profile",msg:"Account successfully updated","session":req.session});
                    }else{
                        console.log(err)
                        res.render("profile",{title:"Profile",msg:"Account could not be updated","session":req.session});
                    }
                });
                
            }else{
                
                res.render("profile",{title:"Profile",msg:"Account could not be updated","session":req.session});
            }
        }
    })

}


// logout
exports.logout = (req,res)=>{
    req.session.destroy;
    res.clearCookie("connect.sid");
    res.redirect("/signin")
}