import mongoose from './index.js'
const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
let Userschema = new mongoose.Schema({
    name:{
        type : String,
        required:[true,"name is required"]
    },
    email:{
        type:String,
        validate:{
            validator:validateEmail,
            message: props => props.value +"is not a valid email"
        },
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
   mobile:{
    type:String,
    required:[true,"mobile number is required"]
   },
   role:{
    type:String,
    default:"user"
   },
   bookings:{
    type:Array,
    default:[]
   }

},{
    versionKey:false
})

let UserModel = mongoose.model("users",Userschema)

export default UserModel