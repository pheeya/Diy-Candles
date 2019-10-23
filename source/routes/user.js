const express = require("express");
const Router = express.Router();

Router.get("/", function(req,res,next){
    res.render('public/Home', {title:"Home"})
});


module.exports = Router;
