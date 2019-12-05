var mongoose = require('../config/db');

var DepartmentSchema = mongoose.Schema({
    DepartmentName: String
})

var Department = mongoose.model('Department',DepartmentSchema,'Department');
module.exports = Department;