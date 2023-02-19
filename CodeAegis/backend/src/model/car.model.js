const mongoose= require("mongoose");
 
const carSchema=new mongoose.Schema({
    model:{type:String,required:true, unique:true},
    color:{type:String, required:true},
    image:{type:String, required:true},
    cloudinary_id:{type:String,required:true}
},{
    timestamps:true
})

 
const Car= mongoose.model("car", carSchema)
module.exports= Car