var express = require("express");
var passport = require("passport");

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

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

router.get("/about", function(req, res){
    console.log("Hello I'am an About");
    res.render("home/about");
});

router.get("/services", function(req, res){
    console.log("Hello I'am an Services");
    res.render("home/services");
});

router.get("/projects", function(req, res){
    console.log("Hello I'am an Projects");
    res.render("home/projects");
});

router.get("/contact", function(req, res){
    console.log("Hello I'am an Contact");
    res.render("home/contact");
});

router.get("/login", function(req, res){
    console.log("Hello I'am an LogIn");
    res.render("home/login");
});

router.get("/logout", function(req, res){
    console.log("Hello I'am an Logout");
    req.logout(req.user, err =>{
            if(err) return next(err);
            res.redirect("/home");
    });
});

router.post("/login",passport.authenticate("login", {
    successRedirect:"/",
    failureRedirect:"/login",
    failureFlash:true
}));


router.get("/signup", function(req, res){
    console.log("Hello I'am an SignUP");
    res.render("home/signup");
});

router.post("/signup", function(req, res, next){
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email: email }, function(err, user) {
        if (err) { return next(err); }
        if (user) {
            req.flash("error", "There's already an account with this email");
            return res.redirect("/signup");
        }

        var newUser = new User({
            username: username,
            password: password,
            email: email
        });

        newUser.save(next);
    });
}, passport.authenticate("login", {
    successRedirect:"/",
    failureRedirect:"/signup",
    failureFlash:true
}));

module.exports = router;