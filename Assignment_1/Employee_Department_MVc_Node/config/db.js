var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/EmployeeDB",{useNewUrlParser: true});
var db = mongoose.connection;
mongoose.set('useFindModify',false);
db.on('error',function(err){
    console.log(err);
});
module.exports = mongoose;