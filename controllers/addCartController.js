
// importing firebase database 
const { FieldValue } = require('firebase-admin/firestore');
const { db } = require('../models/firebase.js');

exports.addCartController = (req,res)=>{
    const id = req.query.product;
    const name = req.query.name;
    const cost = req.query.cost;
    const img = req.query.img;
    const quantity = req.query.quantity;
    try{
        const addCartRef = db.collection('cart')
    const responser = addCartRef.add({
         name:name,cost:cost,img:img,id:id,quantity:quantity
      },{merge:true});
     res.render("home");
     }catch(error){
         res.send(error);
   }
}