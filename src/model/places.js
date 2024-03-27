import mongoose from './index.js'
let PlacesSchema = new mongoose.Schema({
    name:{
        type: String,
        required:["name is required"]
    },
    price:{
        type:String,
        required:["price is required"]
    },
    description:{
        type:String,
        required:["Description is required"]
    },
    image1:{
        type:String,
        required:["image1 is required"]
    },
    image2:{
        type:String,
        required:["image2 is required"]
    },
    day0:{
        type:String,
        required:["day0 is required"]
    },
    day1:{
        type:String,
        required:["day1 is required"]
    },
    day2:{
        type:String,
        required:["day2 is required"]
    }

},{
    versionKey:false
})


let PlacesModel = mongoose.model("places",PlacesSchema)

export default PlacesModel