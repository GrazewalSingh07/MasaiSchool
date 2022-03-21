const express= require("express")
const app=express();

app.use(express.json())
const userController=require("./controllers/user.controller");
const postController=require("./controllers/post.controller")
const{Register,Login} =require("./controllers/auth.controller")
app.use("/users", userController);
app.use("/post", postController)

app.post("/Register", Register)
app.post("/Login", Login)

module.exports=app