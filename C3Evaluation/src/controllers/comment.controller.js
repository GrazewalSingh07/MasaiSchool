const express= require("express")
const router=express.Router();
const {body, validationResult}=require("express-validator")
const Comment= require("../models/comment.model")
router.post("/", body("body").not().isEmpty().isString().withMessage("Please enter a valid comment"), async(req, res)=>{
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }
        const user= await Comment .create(req.body)
        return res.status(200).send(user)
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
})







module.exports=router