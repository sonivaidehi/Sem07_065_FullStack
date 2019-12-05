var express = require('express')
var cookieParser = require('cookie-parser')
const User = require('./../models/user')
const auth = require('./../middlewares/auth')
var router = express.Router()

router.post('/users/login', async (req,res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        if(!user)
            return res.status(400).send({error:"Invalid Email"})
        
        if(user.password === req.body.password)
        {
            const token = await user.generateAuthToken()
            res.cookie('token',token)
            res.status(200).send({ user, token })
        } else {
            res.status(400).send({error:"Invalid Password"})
        }
    } catch (error) {
        res.status(500).send()
    }
})

router.get('/users', auth, async (req,res) => {
    try {
        let users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/users/:id', auth, async (req,res) => {
    //const _id = req.params.id

    try {
        //const user = await User.findById({_id})
        res.status(200).send(req.user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users', async (req,res) => {
    const user = new User(req.body)

    try {    
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/users/:id', async (req,res) => {
    
    const _id = req.params.id
    const OriginalUser = await User.findById({_id})
    const keys = Object.keys(req.body)

    try {
        keys.forEach( key => OriginalUser[key] = req.body[key])
        await OriginalUser.save()    
        res.status(200).send(OriginalUser)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/users/:id', async (req,res) => {
    const _id = req.params.id
    //console.log(req.headers.cookie("Cookie_1"))
    try {
        //const user = await User.findByIdAndDelete({_id})
        res.status(200).send("user")
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router