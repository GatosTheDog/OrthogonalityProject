const express = require('express')
const sequelize = require('../db/sequelize')
const Biz = require('../models/business')
const Staff = require('../models/employees')
const router = new express.Router()

router.post('/biz', async (req, res) => {
    const data = {
        ...req.body
    }
    
    let { biz_name, biz_location, biz_type } = data

    try {
        const newTable = await Biz.sync()
        if(!newTable)
            throw new Error()
    } catch (error) {
        res.status(400).send(error);
    }

    try {
        const newData = await Biz.create({
            biz_name,
            biz_location,
            biz_type
        })
        if(!newData)
            throw new Error()
        res.status(200).send(newData)
    } catch (error) {
        res.status(400).send(error.errors[0].message)
    }
   
})

router.get('/biz', async (req,res) => {
    try {
        const bizs = await Biz.findAll()
        res.status(200).send(bizs)
        
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/biz/:id', async (req,res) => {
    const updates = Object.keys(req.body)
    console.log(updates);
    try {
        const biz = await Biz.findOne({ where: { id: req.params.id} })

        if(!biz)
            throw new Error()

        const updated = await biz.update({
            biz_name: req.body.biz_name,
            biz_location: req.body.biz_location,
            biz_type: req.body.biz_type
        })

        res.status(200).send('updated')

    } catch (error) {
        res.status(404).send({ error: 'Business not found' })
    }
})

router.get('/biz/staff', async (req,res) => {
    const data = {
        ...req.body
    }
    console.log('alekos');
    let { biz } = data

    console.log(req.body.biz);
    try {
        const staff = await Staff.findAll({
            where: { biz_id: req.body.id }
        })

        res.status(200).send(staff)
        
    } catch (error) {
        res.status(400).send(error)
    }
})


router.delete('/biz/staff/:id', async (req,res) => {
    try {
        const deletedQ = await Staff.destroy({
            where:{ id: req.params.id }
        })
        if(!deletedQ){
            res.send('Employee not found')
        } else {
            res.send('Deleted succesfully')
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router