// importing express using require package
const { response } = require("express");
const express = require("express");
const app = express();
const port = 3000;

// importing firebase database 
const { FieldValue } = require('firebase-admin/firestore');
const { db } = require('./models/firebase.js');

// Static Files
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'))
app.use('/img',express.static(__dirname+'public/img'))
app.use('/js',express.static(__dirname+'public/js'))

// Templating Engine
app.set("view engine", "ejs");

// controllers
const {homeController} =require('./controllers/homeController')

// routes for project
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/signin", (req, res) => {
  res.render("auth/signin");
});

app.post("/signinSubmit",(req,res)=>{
    const email = req.query.Email;
    const password = req.query.password;  
    db.collection("users").get().then((docs)=>{
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
            res.render("auth/signupsuccess",{name:name})
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

app.get("/home",homeController);

app.get("/shop", async(req, res) => {
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
});

app.get("/addcart",(req,res)=>{
    const id = req.query.product;
    const name = req.query.name;
    const cost = req.query.cost;
    const img = req.query.img;
    try{
        const addCartRef = db.collection('cart').doc( )   
    const responser = addCartRef.set({
         name:name,cost:cost,img:img
      },{merge:true});
     res.render("home");
     }catch(error){
         res.send(error);
   }
});


app.get("/cart",async(req,res)=>{
  try{
    const cartRef = db.collection('cart')
    const response = await cartRef.get();
    let responseArr = [];
    let cost = 0;
    response.forEach(doc =>{
     responseArr.push(doc.data());
    });
    responseArr.forEach(val=>{
      cost+=parseInt(val.cost)
    })
    if(responseArr.length === 0){
      res.render("emptyCart")
    }
    else {
      res.render("cart",{
       prod : responseArr,
       cost: cost
      });
    }
   }catch(error){
     res.send(error);
   }
})

app.get('/contact',(req,res)=>{
  res.render('contact')
})
// Listen on Port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



