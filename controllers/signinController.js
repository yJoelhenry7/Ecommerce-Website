// importing firebase database 
const { FieldValue } = require('firebase-admin/firestore');
const { db } = require('../models/firebase.js');

exports.signinController = (req,res)=>{
    const email = req.query.Email;
    const password = req.query.password;  
    db.collection("users").where("email","==",email).get().then((docs)=>{
        if(docs.size >0){
            res.render("home")
        }
        else{
            res.render("auth/signinFailed");
        }
    }) 
}