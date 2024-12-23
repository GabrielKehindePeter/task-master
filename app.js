const express = require ( "express" );
const homeController = require ( "./controllers/homeController" );
const taskController = require ( "./controllers/taskController" );
const bodyParser = require ( "body-parser" );
const session = require ("express-session");

const app = express();

app.use (express.static( "views" ));
app.set ( "view engine", "ejs" );
app.use(bodyParser({extended:true}));

// set session
app.use(
    session({
        secret:"secrete",
        resave:false,
        saveUninitialized:true,
        cookie:{secure:false}
    })
)

app.get("/",homeController.index);
app.get("/signin",homeController.signin);
app.post("/signin",homeController.process_signin);
app.get("/signup",homeController.signup);
app.post("/signup",homeController.process_signup);
app.get("/view-all",taskController.all_tasks);
app.get("/low",taskController.tasks_priority);
app.get("/medium",taskController.tasks_priority);
app.get("/high",taskController.tasks_priority);
app.get("/view-task/:id",taskController.view_task);
app.get("/add-task",taskController.add);
app.get("/edit-task/:id",taskController.edit);
app.get("/profile",homeController.profile);
app.post("/profile/:id",homeController.update_profile);

app.post("/add-task",taskController.process_add_task);
app.post("/edit-task/:id",taskController.process_edit_task);
  
app.get("/delete-task/:id",taskController.delete);
app.get("/signout",homeController.logout);

app.listen(3000,()=>{
    console.log("App is runing on 127.0.0.1:3000 on the browser");
})
