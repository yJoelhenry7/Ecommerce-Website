// importing firebase database 
const { FieldValue } = require('firebase-admin/firestore');
const { db } = require('../models/firebase.js');

exports.cartController = async(req,res)=>{
    try{
      const cartRef = db.collection('cart')
      const response = await cartRef.get();
      let responseArr = [];
      let cost = 0;
  
      response.forEach(doc =>{
       responseArr.push(doc.data());
      });
      for(let i=0;i<responseArr.length;i++){
        for(let j=0;j<responseArr.length;j++){
          if(responseArr[i].id===responseArr[j].id){
            responseArr[i].quantity = parseInt(responseArr[i].quantity)+1
          }
        }
      }
  let uniqueResponseArr = [...new Map(responseArr.map((item) => [item["id"], item])).values()]
  
          uniqueResponseArr.forEach(val=>{
            cost+=parseInt(val.cost)
          })
      if(uniqueResponseArr.length === 0){
        res.render("emptyCart")
      }
      else {
        res.render("cart",{
         prod : uniqueResponseArr,
         cost: cost,
        });
      }
     }catch(error){
       res.send(error);
     }
  }