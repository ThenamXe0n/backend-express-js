require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const connectDatabase = require("./config/connectDB")
const app = express()

const UserRouter = require("./routes/user.router")

//middleware
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())
// ... other middleware 

//api route handlere
app.get("/",(req,res)=>{
  res.send("server is running")
})

//user router
app.use("/user",UserRouter)


app.listen("8080",async()=>{
  try{
    await connectDatabase()
    console.log("server is running on port 8080 ")
  }catch(error){
    process.exit()
    console.log(error)
  }
})

