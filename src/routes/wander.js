
import express from "express"
import  UserController from '../controller/wander.js'
import Auth from "../helper/Auth.js"
import multer from "multer"
let router = express.Router()
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         console.log("uijui")
//       cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
//   });

// let upload = multer({storage:storage})
router.post("/createuser",UserController.adduser)
router.post("/login",UserController.login)
router.put("/forgetpassword",UserController.forgetpassword)
router.post("/checkforgetpassword",UserController.checkforgetpassword)
router.put("/changeforgetpassword",UserController.changeforgetpassword)
router.get("/getusers",Auth.checksession,Auth.checkaccess,UserController.getallusers)
router.post("/createplaces",Auth.checksession,Auth.checkaccess,UserController.addPlaces)
router.get("/getplaces",Auth.checksession,Auth.checkaccess,UserController.getPlaces)
router.get("/getuserplaces",UserController.getuserplaces)
router.get("/getplacesbyid/:id",Auth.checksession,UserController.getplacesbyid)
router.put("/editplacebyid/:id",Auth.checksession,Auth.checkaccess,UserController.editplacebyid)
router.put("/booking",Auth.checksession,UserController.booking)
router.get("/getprofile/:id",Auth.checksession,UserController.getuserbyid)
router.put("/cancelbooking",Auth.checksession,UserController.cancelbooking)
// router.get("/paymentprocess",Auth.checksession,UserController.paymentprocess)
// router.post("/payment",Auth.checksession,UserController.payment)
router.put("/confirmbooking",Auth.checksession,UserController.confirmbooking)
router.delete("/deleteplacebyid/:id",Auth.checksession,UserController.deleteplacebyid)
export default router