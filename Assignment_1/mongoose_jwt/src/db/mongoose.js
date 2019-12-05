var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/practise1', {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
})
// .then( () => console.log("Connected") )
// .catch( e => console.log(e) )
module.exports = mongoose