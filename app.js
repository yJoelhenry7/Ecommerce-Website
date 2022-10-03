const express = require("express");
const app = express();
const port = 3000;


// Static Files
app.use(express.static('public'));
app.use('/css',express.static(__dirname+'public/css'))
app.use('/js',express.static(__dirname+'public/js'))
// Templating Engine
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  res.send("Hello World! dwqdjwqbdjwqhbdhbwqdwjhbd");
});


app.get("/signin", (req, res) => {
  res.render("signin");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/forgot", (req, res) => {
  res.render("forgot");
});

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