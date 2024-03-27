import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
const SALT = 10

const Hashpassword = async (data)=>{
    let salt = await bcrypt.genSalt(SALT)
    let hashed = await bcrypt.hash(data,salt)

    return hashed
}
const comparepassword = async (data1,data2) =>{
    return await bcrypt.compare(data1,data2)
}
const createtoken = async (payload)=>{
    let token = await jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })
    return token
}
const decodetoken = async (token)=>{
    return await jwt.decode(token)
}

const checksession = async(req,res,next)=>{
    console.log(req.headers)
    let token = req?.headers?.authorization?.split(" ")[1]
    console.log("checking auth22")
    if(token){
        console.log("checking auth")
        let payload = await  decodetoken(token)
        let currenttime = +new Date()
        console.log(currenttime,payload.exp)
        let ct= Math.floor(currenttime/1000)
        console.log(ct,payload.exp)
        if(ct<payload.exp){
            next()
        }
        else{
            res.status(402).send({
                message:"session expired"
            })
        }

    }
    else{
        console.log("no token")
        res.status(402).send({
            message:"Unauthorised access"
        })
    }
}
const checkaccess = async (req,res,next ) => {
    let token = req?.headers?.authorization?.split(" ")[1]
    if(token){
        let payload = await decodetoken(token)
        if(payload.role==="admin"){
            next()
        }
        else{
            res.status(402).send({
                message:"unauhtorized access"
            })
        }

    }
    else{
        res.status(402).send({
            message:"Unauthorised access"
        }
            )
    }

}

export default {
    Hashpassword,
    comparepassword,
    createtoken,
    checksession,
    checkaccess
}