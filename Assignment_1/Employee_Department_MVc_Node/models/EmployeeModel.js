var mongoose = require("../config/db");
var EmployeeSchema = mongoose.Schema({
    EmployeeName: String,
    EmployeeSalary: Number,
    EmployeeGender: String,
    Department: Object
});
var Employee = mongoose.model("Employee",EmployeeSchema,"Employee");
module.exports = Employee;