var express = require("express");
var app = express();
var multer = require("multer");

var storage = multer.diskStorage({
    destination: function(req,file,callback){
        if(file.mimetype != "image/jpeg" && file.mimetype!="image/jpg" && file.mimetype!="image/png"){
            return callback("Invalid Type: .jpeg/.jpg/.png are allowed");
        }
        callback(null,"UploadedFiles");
    },
    filename: function(req,file,callback){
        callback(null,file.fieldname + "-" + Date.now() + "-" + file.originalname);
    }
})

var upload = multer({storage: storage});

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/FileUpload.html");
})

app.post("/uploadsinglefile",upload.single("singlefile"),(req,res)=>{
    var file = req.file;
    if(!file){
        // const error = new error("upload file please");
        // error.httpStatusCode = 400;
        // next(error);
        res.send("Select file please!")
    }
    else{
        res.send(file);
    }
})


app.post("/uploadmultiplefile",upload.array("multiplefile",10),(req,res)=>{
    var files = req.files;
    if(!files){
        res.send("Select Files Please");
    }
    else{
        res.send(files);
    }
})
app.listen(9101,(req,res)=>{
    console.log("Server is running on port:9101");
})