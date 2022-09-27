var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");
var session = require("express-session");
var flash = require("connect-flash");
var params = require("./params/params");

var setUpPassport = require("./setuppassport");

var app = express();

mongoose.connect(params.DATABASECONNECTION, {useUnifiedTopology:true, useNewUrlParser:true});
setUpPassport();

app.set("port", process.env.PORT || 80);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret:"dfgfyhhyuytuj",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));
app.use(express.static(__dirname + "/public"));

/*
app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/lib/animate"));
app.use(express.static(__dirname + "/lib/owlcarousel/assets"));
app.use(express.static(__dirname + "/lib/lightbox/css"));
app.use(express.static(__dirname + "/img"));
*/

app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"));
});