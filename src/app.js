const express = require('express')
const db = require('./db/sequelize')
const bizRouter = require('./routers/business')
const staffRouter = require('./routers/employees')

const app = express()

app.use(express.json())
app.use(bizRouter)
app.use(staffRouter)


module.exports = app