const express = require('express')
const Staff = require('../models/employees')
const router = new express.Router()
const Biz = require('../models/business')

router.post('/staff', async (req,res) => {
    const data = {
        ...req.body
    }

    let { staff_fname, staff_lname, staff_email, staff_position, staff_biz, staff_phone, biz_id } = data

    try {
        const newTable = await Staff.sync()
        if(!newTable)
            throw new Error()
    } catch (error) {
        res.status(400).send(error);
    }

    try {
        const newData = await Staff.create({
            staff_fname, 
            staff_lname, 
            staff_email,
            staff_position, 
            staff_biz, 
            staff_phone,
            biz_id
        })
       
        if(!newData)
            throw new Error()
        res.status(200).send(newData)
    } catch (error) {
        res.status(400).send(error.parent.detail)
    }

})


module.exports = router