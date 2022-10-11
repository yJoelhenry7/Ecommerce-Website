// importing firebase database 
const { FieldValue, DocumentSnapshot } = require('firebase-admin/firestore');
const { db } = require('../models/firebase.js');

exports.updateItem = (req,res)=>{
    const id = req.query.id;
    const quantity = req.query.quantity;
    const cost = req.query.cost;
    const add = req.query.addcart;
    const val = parseInt(quantity)+1;
    const coster = parseInt(cost);
    const docRef = db.collection('cart').doc(id) 
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