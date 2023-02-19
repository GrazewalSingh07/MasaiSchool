const express=require("express");
const router= express.Router();
const User=require("../model/user.model")
 
const {body, validationResult}=require("express-validator")
 
router.post("/",

   
    
body("email").not().isEmpty().withMessage("Please enter email").bail().isEmail().withMessage("Please enter valid email").bail().custom(async(value)=>{
    let user= await User.findOne({email:value}).lean().exec()
    if(user){
       throw new Error("Email already exists")
    }
    return true
    
   }).bail(),
body("password").not().isEmpty().withMessage("Please enter password"),

async(req,res)=>{
    try {
       
        const errors= validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).send({error:errors.array()})
        }
        
            const curr=await User.create(req.body)
           
            return res.status(200).send({curr,"message":"Registraion successful"})
       
    } catch (error) {
        if(error.code===11000){
           return res.status(500).send("Register successful please login")
        }
        return res.status(400).send(error)
        
    }
})

router.get("/" ,async(req,res)=>{
    try {
        const user= await User.find().lean().exec()
      return  res.status(200).send(user)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
})
 
module.exports= router