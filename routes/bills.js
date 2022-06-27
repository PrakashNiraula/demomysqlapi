const express=require('express')
const db=require('../db')
const router=express.Router();


router.route('/')
.get(async(req,res,next)=>{
    try {
        res.json(await db.allbills())  
    } catch (error) {
        console.log(error);
        next(error); 
    }
})
.post(async(req,res,next)=>{
    try{
res.json(await db.createBill(req.body.guest_name,req.body.tid,req.body.date))
    }catch(error){
        next(error);
    }

})



router.route('/:id')
.get(async(req,res,next)=>{
    try {
        res.json(await db.getbillbyid(req.params.id))  
    } catch (error) {
        console.log(error);
        next(error); 
    }
});

router.route('/:id/products')
.get(async(req,res,next)=>{

try{
    res.json(await db.getProductsbyBill(req.params.id));

}catch(error){
    next(error);
}


})

router.route('/addtobill')
.post(async(req,res,next)=>{
    console.log(req.body)
    
    try {
        res.json(await db.inserttobill(req.body.billid,req.body.productid,req.body.quantity,req.body.rate))
        
    } catch (error) {
        next(error)
        
    }
})


module.exports=router;