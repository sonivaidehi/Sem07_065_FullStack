var mongoose = require('./../db/mongoose')
var validator = require('validator')

const TaskSchema = mongoose.Schema({
    description: {
        type: String,
        require: true,
        trim: true
    },
    completed: {
        type: Boolean
    }
})

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task