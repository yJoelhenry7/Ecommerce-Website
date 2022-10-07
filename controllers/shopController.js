// importing firebase database 
const { FieldValue } = require('firebase-admin/firestore');
const { db } = require('../models/firebase.js');

exports.shopController = async(req, res) => {
    try{
     const prodRef = db.collection('Products')
     const response = await prodRef.get();
     let responseArr = [];
     response.forEach(doc =>{
      responseArr.push(doc.data());
     });
    res.render("shop",{
     prod : responseArr
    });
    }catch(error){
      res.send(error);
    }
}