// importing firebase database 
const { FieldValue, DocumentSnapshot } = require('firebase-admin/firestore');
const { db } = require('../models/firebase.js');

exports.deleteItemController = (req,res)=>{
    const id = req.query.id
      const docRef =  db.collection("cart").doc(id)
     const response = docRef.delete()
     res.render('home')
  }
