import UserModel from "../model/wander.js";
import AUTH from  "../helper/Auth.js"
import MAIL from "../helper/mail.js"
import PlacesModel from "../model/places.js";
import dotenv from 'dotenv'
import Stripe from "stripe";
dotenv.config()

let adduser = async (req,res)=>{
    try {
        let user = await UserModel.findOne({email:req.body.email})
            if(!user){
                let password = await AUTH.Hashpassword(req.body.password)
                 req.body.password = password
                await UserModel.create(req.body)
                res.status(200).send({
                    message:"User created successsfully"
                })
            }
            else{
                res.status(400).send({
                    message:"User already exists"
                })
            }
        }
        catch (error) {
        res.status(500).send({
            message:"Registration failed"
        })
        
    }

}
let login = async (req,res) =>{
    try {
        let {email,password} = req.body
        let user = await UserModel.findOne({email:email})
        if(user){
            if(await AUTH.comparepassword(password,user.password)){
                let token = await AUTH.createtoken({
                    name:user.name,
                    email:user.email,
                    role:user.role
                })
                res.status(200).send({
                    message:"login successfully",
                    token,
                    name:user.name,
                    id:user._id,
                    role:user.role

                })

            }
            else{
                res.status(400).send({
                    message:"invalid password"
                })
            }


        }
        else{
            res.status(400).send({
                message:"invalid email id"
            })
        }
        
    } catch (error) {
       res.status(500).send({
        message:"Login failed"
       }) 
    }
}
let forgetpassword = async (req,res)=>{
    try {
        console.log(req.body.email)
        let user = await UserModel.findOne({email:req.body.email})
        if(user){
            let string = await MAIL.sendemail(user.email,user._id)
            let password = await AUTH.Hashpassword(string)
            user.password = password
            await user.save()
           res.status(200).send({
            message:"email sent successfully"
           })
        }
        else{
            res.status(400).send({
                message:"invalid email_id"
            })
        }
        
    } catch (error) {
        res.status(500).send({
            message:"Internal server error"
        })
    }
}
let checkforgetpassword = async(req,res)=>{
    try {
        let user = await UserModel.findOne({_id:req.body.id})
        if(await AUTH.comparepassword(req.body.password,user.password)){
            res.status(200).send({
                message:"temp password matched"
            })
        }
        else{
            res.status(400).send({
                message:"invalid link"
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal server error"
        })
    }
}
let changeforgetpassword = async(req,res)=>{
    try {
        console.log(req.body)
        let student = await UserModel.findOne({_id:req.body.id})
        console.log(student)
        let password = await AUTH.Hashpassword(req.body.newPassword)
        console.log(password)
        student.password = password
        await student.save()
        res.status(200).send({
            message:"password changed successfully"
        })
    } catch (error) {
        res.status(500).send({
            message:"internal server error"
        })
    }
}
let getallusers = async(req,res)=>{
    try {
        console.log("get all  users")
        let data = await UserModel.find()
        res.status(200).send({
            message:"users data",
            data
        })
        
    } catch (error) {
        res.status(500).send({
            message:"internal server error"
        })
    }
}
let addPlaces = async(req,res)=>{
    try {
        
        await PlacesModel.create(req.body)
        res.status(200).send({
            message:"Places added successfully"
        })
    
    } catch (error) {
        res.status(500).send({
            message:"Internal server error"
        })
    }
}
let getPlaces = async(req,res)=>{
    try {

        console.log("get places")
        let places = await PlacesModel.find()
        res.status(200).send({
            message:"places fetched successfully",
            places
        })
        
    } catch (error) {
        res.status(500).send({
            message:"Internal server error"
        })
    }
}
let getuserplaces = async(req,res) => {
    try {
        
        console.log("get places")
        let places = await PlacesModel.find()
        res.status(200).send({
            message:"places fetched successfully",
            places
        })
        
    } catch (error) {
        res.status(500).send({
            message:"Internal server error"
        })
    }

}
let getplacesbyid = async (req,res)=>{

    try {
       let data = await PlacesModel.findOne({_id:req.params.id})
       res.status(200).send({
        message:"Data fetched successfully",
        data
       })
        
    } catch (error) {
        res.status(500).send({
            message:"Internal server error"
        })
    }
}
let deleteplacebyid = async(req,res) =>{
    try {
        console.log("delete")
        await PlacesModel.deleteOne({_id:req.params.id})
        res.status(200).send({
            message:"Place deleted successfully"
        })
        
    } catch (error) {
        res.status(500).send({
            message:"Internal server error"
        })
        
    }
}
let editplacebyid = async(req,res) =>{
    try {
        
        let place = await PlacesModel.findOne({_id:req.params.id})
        place.price = req.body.price
        place.name=req.body.name
        place.description=req.body.description
        place.image1=req.body.image1
        place.image2=req.body.image2
        place.day0=req.body.day0
       
        place.day1=req.body.day1
        place.day2=req.body.day2
        console.log(req.params.id,"hjhkjhkjh")
        console.log(place)
        await place.save()
        console.log("end")
        res.status(200).send({
            message:"successfully updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"updation failed"
        })
    }
}

let booking = async(req,res) =>{
    try {
        console.log(req.body)
        let user = await UserModel.findOne({_id:req.body.userid})
        let place = await PlacesModel.findOne({_id:req.body.placeid})
        let price  = place.price
        console.log(price)
        let email = user.email
        let total = price*req.body.persons
        let name = place.name
        let persons = req.body.persons
        let startdate = req.body.startDate
        let image = place.image2
        let vehicle = req.body.vehicle
        let packagedetails = {
            name,
            persons,
            startdate,
            total
        }
        let bookingid = await MAIL.bookingmail(email,packagedetails)
        let booking_details = {
            name,
            persons,
            total,
            startdate,
            image,
            bookingid,
            vehicle
        }
        // user.bookings.push(booking_details)
        // await user.save()
        res.status(200).send({
            message:"booking conformation",
            booking_details
        })
    } catch (error) {
        res.status(500).send({
            message:"internal server error"
        })
    }
}
let confirmbooking = async(req,res) =>{
    try {
        console.log("inside conform booking")
        console.log(req.body)
        let user = await UserModel.findOne({_id:req.body.userid})
         user.bookings.push(req.body.bookingDetails)
        await user.save()
        res.status(200).send({
            message:"booking conformation",
           
        })
        
    } catch (error) {
        res.status(500).send({
            message:"Internal server error"
        })
    }
}
let getuserbyid = async(req,res)=>{
    try {
        console.log("inside get user")
        let user = await UserModel.findOne({_id:req.params.id})
        res.status(200).send({
            message:"user details fetched successfully",
            user
        })

    } catch (error) {
        res.status(500).send({
            message:"internal server error"
        })
    }
}
let cancelbooking = async(req,res)=>{
    try {
        console.log(req.body)
        let user = await UserModel.findOne({_id:req.body.id})
        
        user.bookings.forEach((e,i)=>{
            console.log(i,e.bookingid)
            if(e.bookingid===req.body.bookingid){
                console.log(e)
                user.bookings.splice(i,1)
            }
        })
        await user.save()
        
        res.status(200).send({
            message:"booking cancelled successfullly"
        })
        
    } catch (error) {
        res.status(500).send({
            message:"cancellation failed"
        })
    }
}
 
 


export default {
    adduser,
    login,
    forgetpassword,
    checkforgetpassword,
    changeforgetpassword,
    getallusers,
    addPlaces,
    getPlaces,
    getuserplaces,
    getplacesbyid,
    deleteplacebyid,
    editplacebyid,
    booking,
    getuserbyid,
    cancelbooking,
   
    confirmbooking

}