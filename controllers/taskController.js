
const { RANDOM } = require('mysql/lib/PoolSelector');
const {Client} = require ('pg')
const {v4: uuidv4} = require ( 'uuid' );
const { differenceInDays } = require("date-fns");

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
  

// add task
exports.add = (req,res)=>{
    if(!(req.session.email && req.session.password)){
        res.redirect("/signin");
    }else{
         res.render("add-task",{title:"Add Task","session":req.session});
    }
   
}

// edit task
exports.edit = (req,res)=>{
    if(!(req.session.email && req.session.password)){
        res.redirect("/signin");
    }else{

            if(!req.params.id){
                res.redirect("/view-all")
            }

            var task_id = req.params.id;
            var user_id = req.session.user_id;
                pool.query("SELECT * FROM task WHERE task_id =? AND user_id =? LIMIT 1",[task_id,user_id],(err,rows)=>{
                    
                    if(!err){

                        if(rows.length < 1){

                            res.redirect("/view-all")

                        }else{
                            var task = rows[0];
                            var dead_line = (task.dead_line).toString();

                        var days_left = differenceInDays(new Date(task.dead_line), new Date());
                            
                            res.render("edit-task",{"title":"Edit Task","session":req.session,"data":{'title':task.title,'priority':task.priority,'dead_line':dead_line,'stamp_date':task.stamp_date,'task_id':task.task_id,'color':task.color,'description':task.description,'days_left':days_left}});
                            // console.log(days_left)
                        }

                        }else{
                            console.log( err );
                        }


                })



    }

    // console.log(task_id)
    // res.render("edit-task",{title:"Edit Task"});
}

// process add task
exports.process_add_task = (req,res)=>{

    if(!(req.session.email && req.session.password)){
        res.redirect("/signin");
    }else{

            var title = req.body.title;
            var priority = req.body.priority;
            var deadline = req.body.deadline;
            var description = req.body.description;
            var task_id = 't'+uuidv4();
            var update_date = new Date();
            var user_id = req.session.user_id;
            
             //   colors
            var colors = ['warning-bg','danger-bg','secondary-bg','success-bg','primary-bg','info-bg'];
            var d = Math.floor(Math.random()*6)
            var task_color = colors[d];

                // save task
                pool.query("INSERT INTO task(task_id,title, description, dead_line, priority, color,user_id,stamp_date) VALUES(?, ?, ?, ?,?,?,?, NOW())",[task_id, title, description, deadline, priority,task_color,user_id],(err, rows) => {
                        if (err) 
                            {
                            console.error("Error executing query:", err.message);
                        } 
                        console.log(rows)
                        if(rows.affectedRows > 0){
                            res.redirect("/view-all")   
                        }
                            }
                );

        }

}

exports.tasks_priority = (req,res)=>{
        if(!(req.session.email && req.session.password)){
            res.redirect("/signin");
        }else{

            var priority = (req.url).substring(1,10);
            var user_id = req.session.user_id;
            pool.query("SELECT * FROM task WHERE user_id =? AND priority =? ORDER BY stamp_date DESC",[user_id,priority],(err,rows)=>{

            // console.log(results.rowCount);

            var msg = "Showing "+ rows.length + " results for tasks with "+priority+" priority";
            res.render("tasks",{"title":"Tasks","msg":msg,"session":req.session,"data":rows,});

            })

        }

}
exports.all_tasks = (req,res)=>{
        if(!(req.session.email && req.session.password)){
            res.redirect("/signin");
        }else{

            var user_id = req.session.user_id;
            pool.query("SELECT * FROM task WHERE user_id =? ORDER BY stamp_date DESC",[user_id],(err,rows)=>{
            // console.log(results.rows);
            res.render("all-tasks",{"title":"Tasks","session":req.session,"data":rows});

            })

        }

}

// view task
exports.view_task = (req,res)=>{
    if(!(req.session.email && req.session.password)){
        res.redirect("/signin");
    }else{

        if(!req.params.id){
            res.redirect("/view-all")
        }
        var task_id = req.params.id;
        var user_id = req.session.user_id;
            pool.query("SELECT * FROM task WHERE task_id =? AND user_id=? LIMIT 1",[task_id,user_id],(err,rows)=>{
                
                if(!err){

                            if(rows.length < 1){

                                res.redirect("/view-all")

                            }else{
                                var task = rows[0]
                                var dead_line = (task.dead_line).toString();

                            var days_left = differenceInDays(new Date(task.dead_line), new Date());
                                
                                res.render("view-task",{"title":"Task Details","session":req.session,"data":{'title':task.title,'priority':task.priority,'dead_line':dead_line,'stamp_date':task.stamp_date,'task_id':task.task_id,'color':task.color,'description':task.description,'days_left':days_left}});
                            }

                }else{
                    console.log( err );
                }
            })
    }

}

// process edit task
exports.process_edit_task = (req,res)=>{
        if(!(req.session.email && req.session.password)){
            res.redirect("/signin");
        }else{
            var title = req.body.title;
            var priority = req.body.priority;
            var deadline = req.body.deadline;
            var description = req.body.description;
            var task_id = req.params.id

            if(deadline =="")
            {
                    prvdate = req.body.prev_date;

                    const date = new Date(prvdate);
                    var deadline = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " ");
            }

            console.log(priority)
                // update task
                pool.query("UPDATE task SET title =?, description=?, dead_line=?, priority=? WHERE task_id =?",[title, description, deadline,priority,task_id],(err, rows) => {
                        if (err) 
                        {
                            console.error("Error executing query:", err.message);
                        } else{
                         
                            res.redirect("/view-task/task_id")   
                        }
                            }
                );

                
        }
}

exports.delete = (req,res)=>{
        if(!(req.session.email && req.session.password)){
            res.redirect("/signin");
        }else{
            if(!req.params.id){
                res.redirect("/view-all");
            }else{
                var task_id = req.params.id;
                var user_id = req.session.user_id;
                pool.query("SELECT * FROM task WHERE task_id = ? AND user_id =? LIMIT 1",[task_id,user_id],(err,rows)=>{
                    if(!err){
                        if(rows.length < 1 ){
                            res.redirect("/view-all");
                        }else{
                            pool.query("DELETE FROM task WHERE task_id = ?",[task_id],(err,result)=>{
                                if(err){
                                    console.log(err);
                                }else{
                                    if(rows.length > 0){
                                        res.redirect("/view-all");
                                    }else{
                                        res.redirect("/view-all");
                                    }
                                }
                            })
                        }
                    }
                })
            }
    
         }
}