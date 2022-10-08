// importing firebase database 
const { FieldValue } = require('firebase-admin/firestore');
const { db } = require('../models/firebase.js');

exports.signupController = (req,res)=>{
    const name = req.query.user_name;
    const email = req.query.Email;
    const password = req.query.password;  
    const cnfrmpass = req.query.cnfrmpassword; 
    if(password===cnfrmpass){
        db.collection("users").add({
            name :name,
            email:email,
            password:password
        }).then(()=>{
            res.render("auth/signupsuccess",{name:name})
        })
    }
}