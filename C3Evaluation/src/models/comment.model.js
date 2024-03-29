const mongoose= require("mongoose");

const commentSchema=new mongoose.Schema({
    body:{type:String, required:true},
   userId:{tye:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
   bookId:{type:mongoose.Schema.Types.ObjectId, ref:"book", requiredPaths:true}
    
},{
    versionKey:false,
    timestamps:true
})
const Comment= mongoose.model("comment",commentSchema);
module.exports= Comment