var mongoose = require("../Database/db");

var employeeSchema = mongoose.Schema({
    EmployeeName: String,
    EmployeeSalary: Number,
    EmployeeAge: Number
});

var Employee = mongoose.model("Employee",employeeSchema,"Employee");
module.exports = Employee;