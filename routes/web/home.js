var express = require("express");
var passport = require("passport");

var User = require("../../models/user");
var router = express.Router();

router.get("/", function(req, res){
    console.log("Hello I'am an the start here");
    res.render("home/");
});

router.get("/home", function(req, res){
    console.log("Hello I'am an home page");
    res.render("home/home");
});

router.get("/login", function(req, res){
    console.log("Hello I'am an LogIn");
    res.render("home/login");
});

router.get("/about", function(req, res){
    console.log("Hello I'am an About");
    res.render("home/about");
});

router.get("/signup", function(req, res){
    console.log("Hello I'am an SignUP");
    res.render("home/signup");
});

router.post("/signup", function(req, res, next){
    var username =req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email:email}, function(err, user){
        if(err){return next(err);}
        if(user){
            req.flash("error", "There's already an account with this email");
            return res.redirect("/signup");
        }

        var newUser =new User({
            username:username,
            password:password,
            email:email
        })

        newUser.save(next);
    });
}, passport.authenticate("login", {
    successRedirect:"/",
    failureRedirect:"/signup",
    failureFlash:true
}));

module.exports = router;