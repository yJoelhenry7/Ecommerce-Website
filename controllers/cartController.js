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
            responseArr[i].quantity = parseInt(responseArr[i].quantity)
          }
        }
      }
          responseArr.forEach(val=>{
            cost+=parseInt(val.addcart)
          })
      if(responseArr.length === 0){
        res.render("emptyCart")
      }
      else {
        res.render("cart",{
         prod : responseArr,
         cost: cost
        });
      }
     }catch(error){
       res.send(error);
     }
  }