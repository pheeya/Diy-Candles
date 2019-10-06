const express = require("express");
const path = require("path");
const Router = express.Router();

Router.get("/", function(req,res,next){
    res.render('home', {title:"home"})
});


module.exports = Router;
