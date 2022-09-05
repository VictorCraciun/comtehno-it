var express = require("express"),
    app = express(),
    http = require("http").Server(app).listen(80);
console.log("Server started at port 80");
app.get("/", function(req, res){
    res.sendFile(__dirname+"index.html");
})