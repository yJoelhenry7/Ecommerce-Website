// importing firebase database 
const { FieldValue, DocumentSnapshot } = require('firebase-admin/firestore');
const { db } = require('../models/firebase.js');


exports.reduceItem =(req,res)=>{
    const id = req.query.id;
    const quantity = req.query.quantity;
    const cost = req.query.cost;
    const add = req.query.addcart;
    const val = parseInt(quantity)-1;
    const coster = parseInt(cost);
    const docRef = db.collection('cart').doc(id) 
    if(val>0){
      try {
        const responser = docRef.update({
         quantity:val,
         addcart:coster*val
       });
      res.render("home");
      } catch (error) {
        console.log(error.message)
      }
    }
    else if(val==0){
      const response = docRef.delete()
      res.render("home");
    }
  }