const jwt = require("jsonwebtoken")

require('dotenv').config()


const authentication = (req,res,next)=>{
     const token = req.headers?.Authorization?.split(" ")[1]
     if(token){
        var decoded = jwt.verify(token,`${process.env.KEY}`)
        if(decoded){
            const userID = decoded.userID
            req.body.userID = userID
            next()
        }else{
            res.send({msg:"you are not authenticated login please"})
        }
     }else{
        res.send({msg:"you are not authenticated login please"})
     }
}

module.exports = {authentication}