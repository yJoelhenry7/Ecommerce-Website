// importing express using require package
const express = require("express");
const app = express();
const port = 3000;

// importing firebase database 
const { FieldValue } = require('firebase-admin/firestore');
const { db } = require('./models/firebase.js');

// Static Files
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'))
app.use('/js',express.static(__dirname+'public/js'))
// Templating Engine
app.set("view engine", "ejs");

// routes for project
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/signin", (req, res) => {
  res.render("signin");
});

app.get("/signinSubmit",(req,res)=>{
    const email = req.query.Email;
    const password = req.query.password;  
    db.collection("users").where("email","==",email).where("password","==",password).get().then((docs)=>{
        if(docs.size >0){
            res.send("Login Succesfully");
        }
        else{
            res.send("Login Failed");
        }
    }) 
})

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/signUpSubmit",(req,res)=>{
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
            res.send("signup successfully");
        })
    }
})

app.get("/forgot", (req, res) => {
  res.render("forgot");
});

app.get("/forgotVerify",(req,res)=>{
    const email = req.query.Email;
    db.collection("users").where("email","==",email).get().then((docs)=>{
        if(docs.size >0){
            res.render("verify");
        }
        else{
            res.send("you don't have a account")
        }
    })
    console.log(req);
})

app.get("/forgot/pwd", (req, res) => {
  res.render("pwd");
});

app.get("/forgot/verify", (req, res) => {
  res.render("verify");
});

// Listen on Port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});