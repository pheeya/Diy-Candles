const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser=require("body-parser");
const handlebars = require("express-handlebars");

const app = express();
//importing routes
const userRoutes = require("./routes/user");


//compulsary middleware
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.set("views", "views")

app.use(function(req,res,next){console.log("I'm listening"); next();});
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public/media')); 
app.use(express.static('public/css'))
//Routes
app.use(userRoutes);


app.use(function(req,res,next){
    res.status(404).render('404', {title:"no such page"})
});


app.listen(3000);
