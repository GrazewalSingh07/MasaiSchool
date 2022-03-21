const express= require("express")
const router=express.Router();
const {body, validationResult}=require("express-validator")
const Publication=require("../models/publication.model")
router.post("/", async(req, res)=>{
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }
        const user= await Publication.create(req.body)
        return res.status(200).send(user)
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
})







module.exports=router