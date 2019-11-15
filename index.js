var config = require("config");
var express = require("express");
var adminRoutes= require("./routes/admin");
var empRoutes= require("./routes/emp");
var app =  express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = parseInt(config.get("port"));



//Use Middleware
app.use(express.json());
app.use("/employees",empRoutes);


//listen to port for requests