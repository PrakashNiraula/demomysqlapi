var express=require('express');
var router=express.Router();
var db=require('../db/index')

router.route('/')
.get(async(req,res,next)=>{ 
try{
 res.json(await db.getrecent());
}catch(error){
    next(error);
}
})

module.exports=router;