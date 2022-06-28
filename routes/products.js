const express=require('express')
const Router=express.Router();
const product_controller=require('../db/product_controller')

// Router.route("/")
// .get(async (req,res,next)=>{
// try {
//     //res.json(await db.getmyproducts())
//     res.json(await product_controller.getmyproducts())  
// } catch (error) {
//     next(error)
    
// }

// })

module.exports=Router;