//jshint esversion:6


const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.use(bodyparser.urlencoded({extended: true}));

// Now we need to connect mongoose with mongodb database
//The below line connects mongoose and mongodb and
// the name of the dabase that I specified is userDB2

mongoose.connect("mongodb://localhost:27017/userDB2", {useNewUrlParser:  true});


const userSchema = new mongoose.Schema({
  email: String,
  password: String
});


// Name of the model is User
const User = new mongoose.model("User", userSchema);




app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
  // res.sendFile(__dirname + "/index.html");
});



app.get("/signup.html", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});





app.post("/signup.html", function(req,res){
  var emailans = req.body.emailfield;
  var pinans = req.body.pinfield;
  // console.log(emailans);
  // console.log(pinans);

  const newUser = new User({
    email: req.body.emailfield,
    password: req.body.pinfield
  });

  newUser.save(function(err){

    if(err){
      console.log(er);
    }

    else{
      res.sendFile(__dirname + "/Aftersignup.html")
    }

  });


});






app.listen(4000, function(){
  console.log("server is running on port 4000");
  // console.log(emailans);
});
