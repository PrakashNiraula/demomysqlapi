var conn = require("./index");

let db = {};



db.getmyproducts=()=>{
    return new Promise((resolve,reject)=>{
        conn.query("select * from myproducts",(err,result)=>{
            if(err){
                return reject(err)
            }
            console.log(result);
            return resolve(result)
        })
    }) 
}

module.exports = db;
