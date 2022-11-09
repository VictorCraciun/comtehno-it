var express = require("express");
var path = require("path");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");
var params = require("./params/params");


var app = express();

mongoose.connect(params.DATABASECONNECTION, {useUnifiedTopology:true, useNewUrlParser:true});

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

app.use(flash());

app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));
app.use(express.static(__dirname + "/public"));

app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"));
});