const express = require('express')
var router = express.Router()
var Task = require('./../models/task')

router.get('/tasks', async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/tasks', async (req,res) => {
    try {
        const task = new Task(req.body)
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', async (req,res) => {
    const _id = req.params.id
    const OriginalTask = await Task.findById({_id})

    try {
        let keys = Object.keys(req.body)
        keys.every( key => { OriginalTask[key] = req.body[key]; })
        await OriginalTask.save()
        res.status(200).send(OriginalTask)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.delete('/tasks/:id', async (req,res) => {
    const _id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(_id)
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)        
    }
})

router.get('/tasks/:id', async (req,res) => {
    const _id = req.params.id
    try {
        const task = await Task.findById(_id)
        if(!task) return res.status(404).send()
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router