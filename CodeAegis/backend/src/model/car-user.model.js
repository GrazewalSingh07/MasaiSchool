const mongoose= require("mongoose");
 
const carUserSchema=new mongoose.Schema({
   user_id:{type:mongoose.Types.ObjectId, ref:"user", required:true},
   car_id:{type:mongoose.Types.ObjectId, ref:"car", required:true}
},{
    timestamps:true
})

 
const CarUser= mongoose.model("caruser", carUserSchema)
module.exports= CarUser