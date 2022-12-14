const express =require("express")
const app = express()
app.use(express.json())
require('dotenv').config()

const {connect} = require("./config/db")
const {UserRouter} = require("./routes/user.route")
const {TodoRouter} = require("./routes/todo.route")
const { authentication } = require("./middleware/authentication")

app.get("/",(req,res)=>{
    res.send("server run successfully")
})

app.use("/users",UserRouter)
app.use(authentication)
app.use("/todo",TodoRouter)
app.listen(process.env.PORT,async()=>{
      try{
           await connect
           console.log(` server run http://localhost:${process.env.PORT}`)
      }catch(err){
        console.log("something error")
        console.log(err)
      }
})