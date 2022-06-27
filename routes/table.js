var express=require('express');
var router=express.Router();
var db=require('../db/index')

router.route('/')
.get(async(req,res,next)=>{
    try{
        res.json(await db.getallTables());
    }catch(error){
        next(error)
    }
})


router.route('/:tid/:status')
.put(async(req,res,next)=>{
    try{
        res.json(await db.updatetablebyId(req.params.tid,req.params.status))

    }catch(error){
        next(error);
    }
} )







module.exports=router;