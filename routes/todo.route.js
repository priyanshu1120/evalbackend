const express = require("express")
const { NotBeforeError } = require("jsonwebtoken")
const TodoRouter = express.Router()
const {TodoModel}  = require("../model/todo.model")


TodoRouter.get("/",async(req,res)=>{
  
    try{
        const data = await TodoModel.find({userID:req.body.userID})

        res.send(data)
    }catch(err){
        console.log(err)
        res.send("error in get todo")
    }


})

TodoRouter.post("/create",async(req,res)=>{
    try{
        const data = req.body
        const todo = new TodoModel(data)
        await todo.save()
        res.send("item added successfully")
    }catch(err){
        console.log(err)
        res.send("error in post todo")
    }


})


TodoRouter.delete("/:todoID",async(req,res)=>{
    const todoID = req.params.todoID
    const userID = req.body.userID
    try{
        const usertodo = await TodoModel.findOne({_id:todoID})
        if(userID!=usertodo.userID){
            res.send("you are not authnticated")
        }else{
            await TodoModel.findByIdAndDelete({_id:todoID})
            res.send({"msg":"item delete successfully"})
        }
    
    }catch(err){
        console.log(err)
        res.send("error in delete todo")
    }


})


TodoRouter.patch("/:todoID",async(req,res)=>{
    const todoID = req.params.todoID
    const userID = req.body.userID
    const payload = req.body
    try{
        const usertodo = await TodoModel.findOne({_id:todoID})
        if(userID!==usertodo.userID){
            res.send("you are not authnticated")
        }else{
            await TodoModel.findByIdAndUpdate({_id:todoID},payload)
            res.send({"msg":"item updated successfully"})
        }
    
    }catch(err){
        console.log(err)
        res.send("error in update todo")
    }


})

module.exports = {TodoRouter}

