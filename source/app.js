const express = require("express");
const http = require("http");
const bodyParser=require("body-parser");
const handlebars = require("express-handlebars");

const app = express();
app.use(bodyParser.urlencoded({extended:false}));


app.use(function(req,res,next){
    console.log("middleware1");
    next();
});

app.use(function(req,res,next){
    res.send("<h1>yes..</h1>")
})


app.listen(3000);
