const express= require("express")

 
const registerController=require("./controller/register.controller")
const loginController=require("./controller/login.controller")
const carController= require("./controller/car.controller")
const userCarController= require("./controller/user_car.controller")
var bodyParser = require('body-parser');

const app=express()


const cors= require("cors")

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
 app.use(cors())


app.use("/register",registerController)
app.use("/login", loginController)
app.use("/car",carController)
app.use("/user-car",userCarController )

 module.exports=app