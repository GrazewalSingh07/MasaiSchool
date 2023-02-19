const mongoose= require("mongoose")

require("dotenv").config()
module.exports=()=>{
    mongoose.set("strictQuery", false)
    return mongoose.connect(process.env.DATABASE)
}