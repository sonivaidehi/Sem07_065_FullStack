var express = require('express')
var TaskRouter = require('./src/routers/TaskRouter')
var UserRouter = require('./src/routers/UserRouter')
var app = express()

app.use(express.urlencoded({ extended:true }))
app.use(express.json())
app.use(TaskRouter)
app.use(UserRouter)

app.get('*', (req,res) => {
    res.status(404).send();
})

app.listen(8080, () => {
    console.log("App is Running on PORT 8080.")
})