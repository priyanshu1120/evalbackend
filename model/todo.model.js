const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
     taskname:{type:String},
     status:{type:Boolean,default:false},
     tag:{type:String},
     userID:{type:String}
})

const TodoModel = mongoose.model("todo",userSchema)
module.exports = {TodoModel}