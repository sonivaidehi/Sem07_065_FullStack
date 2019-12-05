var express = require("express");
var app = express();
var path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: "http://localhost:4200"}));
var employeeController = require("./Controllers/EmployeeController");
app.use("/employee",employeeController);

app.listen(3000,(req,res)=>{
    console.log("Server running at port : 3000");
})
