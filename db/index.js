const { NotExtended } = require('http-errors')
const mysql=require('mysql')

const pool=mysql.createPool({
connectionLimit:2,
host:'localhost',
user:'root',
password:'aefa8991baba5c1e',
database:'hms',
port:3306

})

let db={}


db.allbills=()=>{
return new Promise((resolve,reject)=>{
    pool.query("select * from guest_bill where status='Ongoing'",(err,results)=>{
       if(err){
           return reject(err);
       } 
       return resolve(results);
    }) 
})

}


db.getbillbyid=(id)=>{
    return new Promise((resolve,reject)=>{
        pool.query("select * from guest_bill where id="+id,(err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}


db.getmyproducts=()=>{
    return new Promise((resolve,reject)=>{
        pool.query("select * from myproducts",(err,result)=>{
            if(err){
                return reject(err)
            }
            console.log(result);
            return resolve(result)
        })
    }) 
}


db.inserttobill=(billid,product_id,quantity,rate)=>{
    return new Promise((resolve,reject)=>{
      
        pool.query("insert into bill_content(`bill_id`,`product_id`,`quantity`,`rate`,`total`) values(?,?,?,?,?)",[billid,product_id,quantity,rate,quantity*rate],(err,res)=>{
            pool.query("insert into recent values(Null,?,?,?)",[billid,product_id,quantity],(err,res)=>{

           
            pool.query("update guest_bill set total=total+?,finalRemaining=finalRemaining+? where id=?",[quantity*rate,quantity*rate,billid],(error,result)=>{
                if(err) reject(err);
                if(error) reject(error);
                return resolve(result);
                
            })
        })
           
        })
    })

}

db.getrecent=async()=>{

    return new Promise((resolve,reject)=>{
        pool.query("select bc.id,bc.billid,pro.id as productId,pro.price,pro.name,bc.quantity,bc.status from recent bc,myproducts pro where pro.id=bc.productid",(err,result)=>{
            
            if(err){
                return reject(err)
            }
           // console.log(result);
            return resolve(result)
        })
    }) 

}


db.createBill=async(guest_name,tid,date)=>{
    return new Promise((resolve,reject)=>{


        pool.query("insert into guest_bill values(Null,?,?,?,?,?,?,?,?,?,?,?,?)",[guest_name,'','0','0','0','0','0','0',date,'Table','Ongoing',tid],(err,result)=>{
            if(err){
                return reject(err)
            }
            //console.log(result);
            return resolve(result)
        })
    })
}



db.getallTables=async()=>{
    return new Promise((resolve,reject)=>{
        pool.query("select * from tables",(err,result)=>{
            if(err){
                return reject(err)
            }
           // console.log(result);
            return resolve(result)
        })
    }) 

}

db.updatetablebyId=async(tid,status)=>{
    return new Promise((resolve,reject)=>{
        pool.query("update tables set status=? where id=?",[status,tid],(err,result)=>{
            if(err){
                return reject(err)
            }
           // console.log(result);
            return resolve(result)
        })
    }) 
}


db.getProductsbyBill=async(billid)=>{
    return new Promise((resolve,reject)=>{
        pool.query("select bc.id,bc.bill_id,pro.id as productId,pro.name,bc.quantity,bc.rate,bc.total from bill_content bc,myproducts pro where pro.id=bc.product_id and bill_id=?",[billid],(err,result)=>{
            if(err){
                return reject(err)
            }
           // console.log(result);
            return resolve(result)
        })
    }) 


}



module.exports=db;
