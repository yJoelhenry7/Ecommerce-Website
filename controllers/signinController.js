// importing firebase database 
const { FieldValue } = require('firebase-admin/firestore');
const { db } = require('../models/firebase.js');

exports.signinController = (req,res)=>{
    const email = req.query.Email;
    const password = req.query.password;  
    db.collection("users").doc(email).get().then((docs)=>{
        const response = docs.data()
        if(response.email == email && response.password == password){
            res.render("home",{
              name: response.name
            })
        }
        else{
            res.render("auth/signinFailed")
        }
    }) 
}