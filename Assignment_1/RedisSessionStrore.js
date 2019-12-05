var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}))
var redis = require("redis");
var session = require("express-session");
var redisstore = require("connect-redis")(session)
var client = redis.createClient();

app.engine("html",require("ejs").renderFile);
app.set('view engine','html');
app.set('views',"./");

app.use(session({
    secret: "vaidehisoni",
    store: new redisstore({
        host: "localhost",
        port: 6379,
        client: client,
        ttl: 60*10*10
    }),
    saveUninitialized : false,
    resave: false
}))

app.get("/",(req,res)=>{
    if(req.session.username  && req.session.password){
        res.render("./Welcome.ejs",{"uname" : req.session.username,"upswd":req.session.password});    
    }else{
        res.render("./Login.ejs",{"error":""});
    }
    //res.render("./Login.ejs",{"error":""});
})

app.post("/logincheck",(req,res)=>{
    var uname = req.body.username;
    var upswd = req.body.password;
    if(uname=="admin" && upswd=="password"){
        req.session.username = uname;
        req.session.password = upswd;
        res.render("./Welcome.ejs",{"uname" : req.session.username,"upswd":req.session.password});
    }else{
        res.render("./Login.ejs",{"error":"Invalid Credentials"})
    }
})

app.get("/logout",(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        
    })
    res.redirect("/");
})
app.listen(9102,(req,res)=>{
    console.log("server running on port:9102");
})
