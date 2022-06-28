var bill_controller=require('./');

let db={};


db.allbills=()=>{
    return new Promise((resolve,reject)=>{
        bill_controller.query("select * from guest_bill where status='Ongoing'",(err,results)=>{
           if(err){
               return reject(err);
           } 
           return resolve(results);
        }) 
    })
    
    }


    db.getbillbyid=(id)=>{
    return new Promise((resolve,reject)=>{
        bill_controller.query("select * from guest_bill where id="+id,(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}




module.exports=db;