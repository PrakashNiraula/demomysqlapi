const express=require('express')
const Router=express.Router();
const db=require('../db')

Router.route("/")
.get(async (req,res,next)=>{
try {
    //res.json(await db.getmyproducts())
    res.json(await db.getmyproducts())  
} catch (error) {
    next(error)
    
}

})

module.exports=Router;