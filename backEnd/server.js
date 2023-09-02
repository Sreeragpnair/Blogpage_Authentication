const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const JWT = require("jsonwebtoken");
const path = require("path")

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontEnd")));

dotenv.config({path:"./config/config.env"});

const users = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontEnd/Signup.html"));
});

app.post("/signup", (req, res) => {

  const { username, email, password } = req.body;

  bcrypt.hash(password,saltRound=10, function (err, hash) {
    if (err) {
      res.send(err.message);
    } else {
      users.push({
        username,
        Email:email,
        password: hash,
      }); 
      console.log(users)
      res.sendFile(path.join(__dirname, "../frontEnd/Signin.html"));
    }
  });
});
app.get("/signin", (req, res) => {

  const {token} = req.cookies;

  if(token){
      JWT.verify(token, process.env.JWT_SECRET_KEY, function(err, result){
          if(err){
              res.sendFile(path.join(__dirname, "../frontEnd/Signin.html"));
          }else if(!err){
           res.redirect('/signin');
          }
      }); 
  }else{
      res.sendFile(path.join(__dirname, "../frontEnd/Signin.html"));
  }
  
});
 
app.post("/signin", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((data) => data.username === username);

  if (!user) {
    res.redirect("/signin");
  } else {
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        console.log("Error comparing passwords:", err);
        res.redirect("/signin");
      } else if (result) {
        const data = {
          username,
          time: Date(),
        };
        const token = JWT.sign(data, process.env.JWT_SECRET_KEY, {
          expiresIn: "10min",
        });

        res.cookie("token", token).redirect("/profile");
        console.log("success...!!!");
      } else {
        console.log("Password  mismatch");
        res.redirect("/signin");
      }
    });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  
  if (token) {
    JWT.verify(token, process.env.JWT_SECRET_KEY, function (err, result) {
      if (result) {
        res.redirect("https://sreeragpnair.github.io/blogpage/");
        
      } else {
        res.redirect("/signin");
        
      }
    });
  } else {
    res.redirect("/");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is on port:${process.env.PORT}`);
});