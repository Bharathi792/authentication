require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
var encrypt = require('mongoose-encryption');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//TODO

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
app.get('/',function(req,res){
  res.render("home");
});
app.get('/login',function(req,res){
  res.render("login");
});
app.get('/register',function(req,res){
  res.render("register");
});

mongoose.connect('mongodb://localhost:27017/userDB',{useNewUrlParser: true, useUnifiedTopology:true });

















const userSchema = new mongoose.Schema({
  email: String,
  password: String
});
var secret = process.env.SECRET;
userSchema.plugin(encrypt, { secret: secret,encryptedFields: ['password'] });

const User = mongoose.model('User',userSchema);

app.post('/register',function(req,res){
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err){
    if(err){
      console.log(err);
    }
    else {
      res.render("secrets");
    }
  })
})
app.post('/login',function(req,res){
   const userName =(req.body.username);
   const password =(req.body.password);
   User.findOne({email:userName,password:password},function(err,foundUser){
     if(err){
       console.log(err)
     }
     else{
       res.render("secrets")
     }
   })
})
