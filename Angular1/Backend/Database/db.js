var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Angular1",{
    useNewUrlParser:true
});
var db = mongoose.connection;
db.on("error",(err)=>{
    console.log("error while connecting to mongo")
})

module.exports = mongoose;