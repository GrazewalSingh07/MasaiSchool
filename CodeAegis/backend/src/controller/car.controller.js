const Car= require("../model/car.model")
const express= require("express")
const router= express.Router()
const cloudinary= require("../config/cloudinary")
const upload=require("../config/multer")
const authenticate = require("../middlewares/authenticate")
const CarUser = require("../model/car-user.model")



router.get("/get_all",authenticate,async(req,res)=>{
    try {
        let cars= await Car.find().lean().exec()
        return res.status(200).send({"message":"fetched cars successfully", cars})
    } catch (error) {
        return res.status(500).send({message:"fetch car failed",error})
    }
})

router.get("/:id",authenticate,async(req,res)=>{
    try {
        let cars= await Car.find({_id:req.params.id}).lean().exec()
        return res.status(200).send({"message":"fetched cars successfully", cars})
    } catch (error) {
        return res.status(500).send({message:"fetch car failed",error})
    }
})
router.get("/",authenticate,async(req,res)=>{
    try {
       const id=req.user._id
        let user_cars= await CarUser.find({"user_id":id},{"car_id":1,_id:0}).lean()
          user_cars= user_cars.map((el)=>{
            return el.car_id.valueOf()
          })
       
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
          if(user_cars.length>0){
          allCars=  await Car.find({_id: {$nin: user_cars}}).skip(skipval).limit(size).lean().exec()
           total=allCars.length
           totalPage=Math.ceil(allCars.length/10)
          }else{
            allCars=await Car.find().skip(skipval).limit(size).lean().exec()
             total=allCars.length
             totalPage=Math.ceil(allCars.length/10)
          }
     

        return res.status(200).send({"message":"fetched cars successfully", allCars, "pagination":{total,totalPage,limit:10}})
    } catch (error) {
        return res.status(500).send({message:"fetch car failed",error})
    }
})
 

router.post("/",authenticate,upload.single('file'), async(req,res)=>{
    try {
       
        const result= await cloudinary.uploader.upload(req.file.path)
        console.log(result)
        const data={
             model:req.body.model,
             color:req.body.color,
             image:result.secure_url,
             cloudinary_id:result.public_id||user.cloudinary_id
        }
        const car=await Car.create(data)
        return res.status(201).send({"message":"Car created successfully",car})
        
    } catch (error) {
        return res.status(500).send({message:"Car creation failed",error})
    }
})
router.patch("/:id",authenticate,upload.single('file'), async(req,res)=>{
    try {
    
        const car=await Car.findById(req.params.id)
       
        await cloudinary.uploader.destroy(car?.cloudinary_id,(err,res)=>{
            console.log("delete",err,res)
        })
        const result= await cloudinary.uploader.upload(req.file.path,(err,res)=>{ 
            console.log("upload new file",err,res)
        }) 
        
        const data={
            model:req.body.model,
            color:req.body.color,
            image:result.secure_url||car.image,
            cloudinary_id:result.public_id||car.cloudinary_id
       }
      
       let newCar= await Car.findByIdAndUpdate(req.params.id,data,{new:true}).exec()

        return res.status(201).send({"message":"Car updated successfully",newCar})
        
    } catch (error) {
        return res.status(500).send({message:"Car update failed",error})
    }
})
module.exports=router