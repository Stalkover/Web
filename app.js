const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://0.0.0.0:27017/User");

const User = require("./model/user");

app.get('/', function(req, res){
    res.sendFile(__dirname + "/registration.html");
});

app.get('/login', function(req, res){
    res.sendFile(__dirname + "/login.html");
});

app.post('/', function(req, res){
    let name = req.body.name;
    let email = req.body.email;
    let city = req.body.city;
    let pass = req.body.password;
    let role = "Inactive";
    if (pass.length < 7) {
        return res.send("Password less than 7 characters")
    }
    if (pass.toLowerCase() === pass){
        return res.send("Include capital letters in password")
    }
    if (pass.toUpperCase() === pass){
        return res.send("Include small letters in password")
    }
    for(let i = 0; i < pass.length; i++){
        let char = pass[i].charCodeAt();
        if(char >= 32 && char <= 47 ||
            char >= 58 && char <= 64 ||
            char >= 91 && char <= 96 ||
            char >= 123 && char <= 126){
            break;
        }
        if(i == pass.length - 1){
            return res.send("Include special letters in password")
        }
    }
    User.findOne({email: email}, function(err, foundUser){
        if(foundUser){
            return res.send("Such email already registered")
        }
    })
    if(email === "admin@admin.com"){
        role = "Active"
    }
    const newUser = new User({
        name: name,
        email: email,
        city: city,
        password: pass,
        role: role
    });

    newUser.save(function(err){
        if(err) {
            console.log(err);
        } else {
            res.send("Signed up successfully");
        }
    });
});

app.post('/login', function(req, res){
    const mail = req.body.email;
    const password = req.body.password;

    User.findOne({email: mail}, function(err, foundUser){
        if(err) {
            console.log(err);
        } else {
            try {
                if(foundUser.password === password) {
                    User.findOneAndUpdate({email: mail}, {reg_time: Date.now()}, {
                        new: true
                    })
                    if(foundUser.role === "Active"){
                        res.redirect("http://localhost:3000/admin")
                    }
                    else{
                        res.send("Logged successfully")
                    }
                }
                else  {
                    res.send("Wrong email/password")
                    res.redirect('/login');
                }
            }catch(err){
                console.log(err);
                res.send("Wrong email/password")
            }
        }
    });
});
app.get("/admin", function(req, res){
    res.sendFile(__dirname + "/AdminPage/server.js");
});

app.listen(4000, function(req, res){
    console.log("Server started on Port 4000");
});