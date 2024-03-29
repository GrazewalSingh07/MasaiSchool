const mongoose= require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String},
    age:{type:Number, required:true},
    email:{type:String, required:true},
    profileImages:[{type:String, required:true}],
    password:{type:String,required:true}
    
},{
    versionKey:false,
    timestamps:true
})
const bcrypt=require("bcrypt")
userSchema.pre("save",function (next){
   const hash=bcrypt.hashSync(this.password, 8);
   this.password=hash
   return next()
})
userSchema.methods.checkPassword=function(password){
    return bcrypt.compareSync(password, this.password)
}
const User= mongoose.model("user",userSchema);
module.exports= User