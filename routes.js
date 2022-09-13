var express = require("express");
var router = express.Router();

router.get("/", function(req, res){
    console.log("Hello I'am an the start here");
    res.render("index");
});

router.get("/home", function(req, res){
    console.log("Hello I'am an home page");
    res.render("home");
});

router.get("/login", function(req, res){
    console.log("Hello I'am an LogIn");
    res.render("login");
});


module.exports = router;