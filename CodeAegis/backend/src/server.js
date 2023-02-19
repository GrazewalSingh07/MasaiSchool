const app= require("./index")
require("dotenv").config()
const PORT=process.env.PORT||4000
const connect= require("./config/db")

app.listen(PORT,()=>{
    try {
        connect()
        console.log("http://localhost:4000")
        
    } catch (error) {
        
    }
})