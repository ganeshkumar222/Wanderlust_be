import express from 'express'
import InderController from '../controller/index.js'
import userroutes from './wander.js'
let router = express.Router()

router.get("/",InderController.homepage)
router.use("/user",userroutes)


export default router