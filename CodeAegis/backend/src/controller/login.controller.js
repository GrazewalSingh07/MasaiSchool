const express= require("express");
const User = require("../model/user.model");
 const router= express.Router();
const {body,validationResult}=require("express-validator")
const jwt = require('jsonwebtoken');
require("dotenv").config()
 
const newToken=(user)=>{
    return jwt.sign({user},process.env.JWT_SECRECT_TOKEN)
}
 

 
 router.post("/",
 body("email").not().isEmpty().withMessage("Please enter email").isEmail().withMessage("Please enter valid email")
 .custom(async(value)=>{
    let user= await User.findOne({email:value}).lean().exec()
    
    if(!user){
        throw new Error("User doesnot exist, Please register")
    }
    return true
 }).bail(),
 body("password").not().isEmpty().bail(),

 async(req,res)=>{
     try {
        const errors=validationResult(req)
         
        if(!errors.isEmpty()){
           return res.status(400).json({error:errors.array()})
        }


       let user= await User.findOne({email:req.body.email}).exec()
       let match= user.checkPassword(req.body.password)
       if(!match){
        
           return  res.status(400).send("Incorrect password")
       }

       const token=newToken(user)

       return res.status(200).send({user,token, message:"Logged in successfully"})
     } catch (error) {
        return res.status(500).send({error:error.message})
     }
     
 })
 module.exports= router