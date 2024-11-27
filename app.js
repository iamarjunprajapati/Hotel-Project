const express = require('express');
const app = express();
const fs = require('fs');
const mongoose = require('mongoose');
var bodyParser = require("body-parser");
const signUpData = require("./mongodb");
const path = require('path');

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost/Hotel');
//   console.log("Contacts database connected");  
// }
//     // defining mongoose schema
// const contactSchema = new mongoose.Schema({
//     name: String,
//     age: Number,
//     email: String,
//     address: String,
//     more: String
//   });
//     // converting schema into a model
// const contactData = mongoose.model('contactData', contactSchema );



app.use(express.static('public'));
app.engine('.html',require('ejs').renderFile);
app.set('view engine', 'html');

app.set('views', path.join(__dirname, 'views'));



// url encoded encode the user data and save it in database;
app.use(express.urlencoded());

app.get('/', (req, res) => {
  res.render("index.html");
})

app.get('/contact', (req, res) => {
  res.render("contact.html");
});

app.get('/signup',(req,res)=>{
  res.render("signup.html");
})

app.get('/signin',(req,res)=>{
  res.render("signin.html");
})

app.post("/signup",(req,res)=>{
  let data = new signUpData(req.body);
  // console.log(data);
  data.save().then(()=>{
      // alert("success");    
      res.status(200).render("signin.html");
      // console.log(data);
  })
  .catch("there is a problem while saving the data.");
});

app.post("/signin", async(req,res)=>{
  try {
    const check = await signUpData.findOne({name:req.body.name});
    if(check.password ===req.body.password){
      res.render("index.html");
    }
    else{
      res.send("wrong identity");
    }
  } catch (error) {
    res.send("login failed");
  }
});


app.post("/contact",(req,res)=>{
    let data = new contactData(req.body);
    // console.log(data);
    data.save().then(()=>{
        res.status(200).send("Your data has been saved to database sucessfully");
    })
    .catch("there is a problem while saving the data.");
});

app.listen(80);
console.log("Server running on port 80");

