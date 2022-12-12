const express = require("express")
const UserRouter = express.Router()
const {UserModel}  = require("../model/user.model")

require('dotenv').config()
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

UserRouter.post("/signup",async(req,res)=>{
      let {name,email,password} = req.body
      let userpresent = await UserModel.findOne({email})
      if(userpresent){
        res.send({"msg":"email already exist try with other"})
      }
        
      else{

          try{

              bcrypt.hash(password,5,async (err,hash)=>{
                const userData = new UserModel({email,password:hash,name})
                await userData.save()
                res.send("user created successfully")
              })

          }catch(err){
               console.log(err)
               res.send({"msg":"somthing wrong in user create"})
          }



      }
})


UserRouter.post("/login",async(req,res)=>{
    let {email,password} = req.body
    try{
      let user = await UserModel.find({email})
      if(user.length>0){
        const hashed_password = user[0].password
       bcrypt.compare(password,hashed_password,(err,result)=>{
              if(result){
                 const token = jwt.sign({userID:user[0]._id},`${process.env.KEY}`)
                 res.send({msg:"login successfully",token:token})
              }else{
                 res.send("authentication failed")
              }
       })

      }else{
          res.send("authentication failed")
      }
    }
catch(err){

}
})






module.exports = {UserRouter}