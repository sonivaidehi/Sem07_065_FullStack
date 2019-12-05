var Department = require("../models/DepartmentModel");
var router = require("express").Router();

router.get("/",function(req,res){
    Department.find(function(err,depts){
        if(err) throw err;
        res.render("./department/ShowDepartments.ejs",{"data":depts});
    })
})

router.get("/addDepartment",function(req,res){
    res.render("./department/addDepartment.ejs",{"data":""});
})

router.post("/addDepartmentpost",function(req,res){
    var ids = req.body.id;
    var deptname = req.body.deptname;

    if(ids.length>0){
        var newdata = {DepartmentName: deptname};
        Department.updateOne({_id: ids},newdata,function(err,result){
            if(err) throw err;
        })
    }
    else{
        var d1 = new Department({
            DepartmentName: deptname
        })
        d1.save(function(err,data){
            if(err) throw err;
            //res.redirect("./");
            res.status(200).send(data);
        })
    }
    res.redirect("/department/");
    
})

router.get("/EditDepartment/:id",function(req,res){
    Department.findOne({_id: req.params.id},function(err,result){
        if(err) throw err;
        res.render("./department/addDepartment.ejs",{"data":result});
    })
})


router.get("/DeleteDepartment/:id",function(req,res){
    var ids = req.params.id;
    console.log(ids)
    Department.deleteOne({_id: ids},function(err,data){
        if(err) throw err;
        console.log(data);
    })

    res.redirect("/department");
})
module.exports=router;