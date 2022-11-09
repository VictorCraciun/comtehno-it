var express = require("express");
const Subscribers = require("../../models/subscribers");

const Mess = require("../../models/messages");
var router = express.Router();

//route to pages
router.get("/", function(req, res){
    console.log("I'am an the start now");
    res.render("home/");
});

router.get("/home", function(req, res){
    console.log("I'am an home page");
    res.render("home/home");
});

router.get("/about", function(req, res){
    console.log("I'am an About");
    res.render("home/about");
});

router.get("/subscription", function(req, res){
    console.log("I'am an Subscription");
    res.render("home/subscription");
});

router.get("/services", function(req, res){
    console.log("I'am an Services");
    res.render("home/services");
});

router.get("/projects", function(req, res){
    console.log("I'am an Projects");
    res.render("home/projects");
});

router.get("/contact", function(req, res){
    console.log("I'am an Contact");
    res.render("home/contact");
});

//register subscribers
router.post("/subscribe", function(req, res){
    var newSubscription = new Subscribers({
        emailSubscribe: req.body.formsubscribe
    });

    Subscribers.findOne({ emailSubscribe: req.body.formsubscribe }, function(err, user) {
        if (err) { return next(err); }
        if (user) {
            console.log("Subscribe error: There's already subscribe with this email");
            req.flash("error_subscribe", "There's already subscribe with this email");
            res.redirect("/home");
        }

        newSubscription.save(function(err, post){
            if(err){console.log(err)} 
            console.log("Subscription add");
            req.flash("info_subscribe", "You are subscribed"); 
            res.redirect("/home");
        });
    });

});

//register a contact query
router.post("/send-email", function (req, res) {
    var newMessages = new Mess({
        name: req.body.firstname,
        youremail: req.body.emailadress,
        messages: req.body.formmessage,
    });

    newMessages.save(function(err, post){
        if(err){console.log(err)}
        req.flash("info_contact", "You message was send!"); 
        res.redirect("/contact");
    });
});

module.exports = router;