const express= require("express")
const router=express.Router();
const {body, validationResult}=require("express-validator")
const Book= require("../models/book.model")
router.post("/", body("content").not().isEmpty().isString(),
body("coverImage").not().isEmpty().isString(), async(req, res)=>{
    try {
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({error:errors.array()})
        }
        const user= await Book .create(req.body)
        return res.status(200).send(user)
    } catch (error) {
        return res.status(400).send({error:error.message})
    }
})







module.exports=router