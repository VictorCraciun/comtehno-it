var express = require("express");

var router = express.Router();

router.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error_subscribe = req.flash("error_subscribe");
    res.locals.info_subscribe = req.flash("info_subscribe");
    res.locals.info_contact = req.flash("info_contact");
    next();
});

router.use("/", require("./home"));

module.exports = router;