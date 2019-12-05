var Employee = require("../models/EmployeeModel");
var Department = require("../models/DepartmentModel");
var router = require("express").Router();

router.get("/",function(req,res){
    Employee.find(function(err,result){
        if(err) throw err;
        Department.find(function(err,data){
            res.render("./employee/showEmployee.ejs",{"data":result,"deptdata":data});
        })
        
    })
})

router.get("/addEmployee",function(req,res){
    Department.find(function(err,result){
        res.render("./employee/addEmployee.ejs",{"data":"","deptdata":result});
    });
})

router.post("/addemployeepost",function(req,res){
    var ids = req.body.id;
    var empname = req.body.empname;
    var empsalary = req.body.salary;
    var gender = req.body.empgender;
    var dept = req.body.dept;
    if(ids.length>0){
        var emp = {EmployeeName: empname,EmployeeSalary:empsalary,EmployeeGender: gender,Department:dept};
        Employee.updateOne({_id: ids},emp,function(err,data){
            if(err) throw err;
            console.log(data);
        })
    }else{
        var emp = new Employee({
            EmployeeName: empname,
            EmployeeSalary: empsalary,
            EmployeeGender: gender,
            Department: dept
        });
        emp.save(function(err,data){
            if(err) throw err;
            console.log(data);
            //res.status(200).send(data);
        })
    }

    res.redirect("/employee/");
})

router.get("/editEmployee/:id",function(req,res){
    var ids = req.params.id;
    Employee.findById(ids,function(err,emp){
        Department.find(function(err,dept){
            res.render("./employee/addEmployee.ejs",{"data":emp,"deptdata":dept})
        })
    })
})

router.get("/deleteEmployee/:id",function(req,res){
    var ids = req.params.id;
    Employee.deleteOne({_id:ids},function(err,data){
        if(err) throw err;
        console.log(data);
        res.redirect('/employee/');
    })
})
module.exports = router;
