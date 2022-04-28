//jshint esversion:6

require('dotenv').config();
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 =  require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

console.log(process.env.API_KEY);


app.use(bodyparser.urlencoded({extended: true}));

// Now we need to connect mongoose with mongodb database
//The below line connects mongoose and mongodb and
// the name of the dabase that I specified is userDB2

mongoose.connect("mongodb://localhost:27017/userDB2", {useNewUrlParser:  true});


const userSchema = new mongoose.Schema({
  email: String,
  password: String
});



// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]});

// Name of the model is User
const User = new mongoose.model("User", userSchema);




app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
  // res.sendFile(__dirname + "/index.html");
});



app.get("/signup.html", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});


app.get("/login.html", function(req,res){
  res.sendFile(__dirname + "/login.html");
});




// Starting of the Handling of post request for signup.html route
app.post("/signup.html", function(req,res){
  // var email = req.body.username;
  // var password =  md5(req.body.password);
  // console.log(emailans);
  // console.log(pinans);

   bcrypt.hash(req.body.password, saltRounds, function(err, hash){

     const newUser = new User({
       email: req.body.username,
       password: hash
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






});
// End of handling of the post request for signup.html route











// Starting of the Handling of post request for login.html route

app.post("/login.html", function(req,res){
const username = req.body.username;
const password = req.body.password;

//User is the name of the collection
User.findOne({email: username}, function(err, foundUser){
  if(err){
    console.log(err);
  }

  else{
    if(foundUser){
      // if(foundUser.password === password){

      bcrypt.compare(password, foundUser.password, function(err, result){
         if(result === true){
res.sendFile(__dirname + "/Aftersignup.html");

         }

      });


        // console.log(foundUser.password);
        // res.send("Hello");


      }
    }
  

});

});



app.listen(4000, function(){
  console.log("server is running on port 4000");
  // console.log(emailans);
});
