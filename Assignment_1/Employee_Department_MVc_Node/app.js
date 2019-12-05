var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


// app.use(express.static('views'));
app.engine('html',require("ejs").renderFile);   
app.set('view engine','html');
app.set('views',path.join(__dirname, 'views'));

var DepartmentController = require("./controllers/DepartmentController");
app.use('/department',DepartmentController);
var EmployeeController = require("./controllers/EmployeeController");
app.use('/employee',EmployeeController)

app.get("/home",function(req,res){
    res.render("home.ejs");     
})
app.listen(9000);