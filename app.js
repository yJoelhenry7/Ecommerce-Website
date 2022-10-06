// importing express using require package
const { response } = require("express");
const express = require("express");
const app = express();
const port = 3000;

// importing firebase database 
const { FieldValue } = require('firebase-admin/firestore');
const homeController = require("./contollers/homeController.js");
const { db } = require('./models/firebase.js');

// Static Files
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'))
app.use('/img',express.static(__dirname+'public/img'))
app.use('/js',express.static(__dirname+'public/js'))
// Templating Engine
app.set("view engine", "ejs");

// routes for project
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/signin", (req, res) => {
  res.render("auth/signin");
});

app.get("/signinSubmit",(req,res)=>{
    const email = req.query.Email;
    const password = req.query.password;  
    db.collection("users").where("email","==",email).where("password","==",password).get().then((docs)=>{
        if(docs.size >0){
            res.render("home")
        }
        else{
            res.send("Login Failed");
        }
    }) 
})

app.get("/signup", (req, res) => {
  res.render("auth/signup");
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
            res.render("signupsuccess",{name:name})
        })
    }
})

app.get("/forgot", (req, res) => {
  res.render("auth/forgot");
});

app.get("/forgotVerify",(req,res)=>{
    const email = req.query.Email;
    db.collection("users").where("email","==",email).get().then((docs)=>{
        if(docs.size >0){
            res.render("auth/verify");
        }
        else{
            res.send("you don't have a account")
        }
    })
    console.log(req);
})

app.get("/forgot/pwd", (req, res) => {
  res.render("auth/pwd");
});

app.get("/forgot/verify", (req, res) => {
  res.render("auth/verify");
});

app.get("/home", async(req,res)=>{

    res.render('/home')
});
app.get("/shop", async(req, res) => {
  try{
   const userRef = db.collection('Products')
   const response = await userRef.get();
   let responseArr = [];
   response.forEach(doc =>{
    responseArr.push(doc.data());
   });
  res.render("shop",{
   prod1:responseArr[0], prod2:responseArr[1], prod3:responseArr[2],  prod4:responseArr[3], prod5:responseArr[4], prod6:responseArr[5]
   ,prod7:responseArr[6],prod8:responseArr[7]
  })

  }catch(error){
    res.send(error);
  }

});
app.post("/shop/product", (req, res) => {
  console.log(req.query);
  res.render("product");
});

app.get("/cart",(req,res)=>{
   res.render("cart");
})
// Listen on Port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});