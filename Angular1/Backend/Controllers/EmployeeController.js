var express = require("express");
var router = express.Router();

var Employee = require("../Models/EmployeeModel");


router.get("/getAllEmployees",(req,res)=>{
    Employee.find((err,emps)=>{
        if(err) throw err;
        res.json({msg: emps});
    })
})

router.post("/insertEmployee",(req,res)=>{
    var emp = new Employee({
        EmployeeName: req.body.EmployeeName,
        EmployeeSalary: req.body.EmployeeSalary,
        EmployeeAge: req.body.EmployeeAge
    })
    emp.save((err,emp)=>{
        if(err) throw err;
        res.send(emp);
    })
})

router.put("/updateEmployee/:id",(req,res)=>{
    var emp = {
        EmployeeName: req.body.EmployeeName,
        EmployeeSalary: req.body.EmployeeSalary,
        EmployeeAge: req.body.EmployeeAge
    };
    Employee.findByIdAndUpdate(req.params.id,emp,(err,emp)=>{
        if(err) throw err;
        res.send(emp);
    })
})
router.delete("/deleteEmployee/:id",(req,res)=>{
    Employee.findByIdAndRemove(req.params.id,(err,emp)=>{
        if(err) throw err;
        res.send(emp);
    })
})

module.exports = router;