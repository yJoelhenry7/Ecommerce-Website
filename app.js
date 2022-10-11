// importing express using require package
const { response } = require("express");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const port = 3000;


// importing firebase database 
const { FieldValue } = require('firebase-admin/firestore');
const { db } = require('./models/firebase.js');

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Static Files
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'))
app.use('/img',express.static(__dirname+'public/img'))
app.use('/js',express.static(__dirname+'public/js'))

// Templating Engine
app.set("view engine", "ejs");

// controllers
const {homeController} =require('./controllers/homeController');
const { shopController } = require("./controllers/shopController.js");
const { addCartController } = require("./controllers/addCartController.js");
const { cartController } = require("./controllers/cartController.js");
const { signinController } = require("./controllers/signinController.js");
const { signupController } = require("./controllers/signupController.js");
const { deleteItemController } = require("./controllers/deleteItemController.js");
const { reduceItem } = require("./controllers/reduceItemController.js");
const { updateItem } = require("./controllers/updateItemController.js");

// routes for authorization of user
app.get("/",(req, res) => {
  res.render('auth/signin')
});

app.get("/signin", (req, res) => {
  res.render("auth/signin");
});

app.get("/signinSubmit",signinController)

app.get("/signup", (req, res) => {
  res.render("auth/signup");
});

app.get("/signUpSubmit",signupController)

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
        res.render("auth/signinFailed")
    }
    })
})

app.get("/forgot/pwd", (req, res) => {
  res.render("auth/pwd");
});

app.get("/forgot/verify", (req, res) => {
  res.render("auth/verify");
});



// Routes for Web application
app.get("/home",homeController);

app.get("/shop", shopController);

app.get("/addcart",addCartController);

app.get("/cart",cartController)


app.get('/contact',(req,res)=>{
  res.render('contact')
})

app.get("/deleteItem",deleteItemController)

app.get('/reduceItem',reduceItem)

app.get('/updateItem',updateItem)

// Listen on Port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});



