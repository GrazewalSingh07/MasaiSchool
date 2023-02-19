const express= require("express")
const authenticate = require("../middlewares/authenticate")
const CarUser = require("../model/car-user.model")

const router=express.Router()

router.post("/",authenticate,async(req,res)=>{
    try {
        let data={
            user_id:req.user._id,
            car_id:req.body.car_id
        }
        let user_car=await CarUser.create(data)
        return res.status(201).send({message:"car purchased successfully", user_car})

    } catch (error) {
        return res.status(500).send("car purchase failed")
    }
})

router.get("/",authenticate,async(req,res)=>{
    try {
       const id=req.user._id
       const {page =1,limit=10}= req.query
  
       if (!page) {
       
          page = 1;
      }
    
      
      if (!limit) {
          limit = 10;
      }
     
      const size = parseInt(limit);
       
      let skipval=(page-1)*limit
     
       let allCars
       let total
       let totalPage

        let user_cars= await CarUser.find({"user_id":id}).populate({"path":"car_id"})
  total=user_cars.length
           totalPage=Math.ceil(user_cars.length/10)
        return res.status(200).send({"message":"fetched user cars successfully", user_cars,"pagination":{total,totalPage,limit:10}})
    } catch (error) {
        return res.status(500).send({message:"fetch user car failed",error})
    }
})
module.exports= router

