const express= require("express")
const {body, validationResult}=require("express-validator")
const router=express.Router();

const User= require("../models/user.model")
router.post("/",
body("firstName").not().isEmpty().isString().isLength({min:3, max:30}).withMessage("First Name is required"),
body("lastName").isString().custom((value)=>{
 if(value.length<3||value.length>30){
     throw new Error("Last name if entered, must be atleast 3 characters and miximum 30")
 }
}),
body("age").not().isEmpty().isNumeric({min:1,max:150}),
body("email").not().isEmpty().isEmail().custom(async(value)=>{
    let user= await User.findOne({email:value}).lean().exec();
    if(user){
        throw new Error("Email already exists")
    }
    return true
}), async(req, res)=>{
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }
        
        const user= await User.create(req.body)
        return res.status(200).send(user)
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
})

router.get("/",async(req,res)=>{
    try {
        const user= await User.find().lean().exec()
        return res.status(200).send(user)
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
})





module.exports=router