const allRouters = require('express').Router()
const userRouter = require('./userRouter')
const revenueRouter = require('./revenueRouter')
allRouters.use(userRouter)
allRouters.use(revenueRouter)

module.exports = allRouters