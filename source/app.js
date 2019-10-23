const express = require("express");
const path = require("path");
const bodyParser=require("body-parser");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
var db = mongoose.connection;
const app = express();
//importing routes
const publicRoutes = require("./routes/public");
const adminRoutes = require("./routes/admin");


//compulsary middleware
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.set("views", "views")


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use(publicRoutes);
app.use("/admin", adminRoutes)


app.use(function(req,res,next){
    res.status(404).render('404', {title:"no such page"})
});


app.listen(3000, function(){
    mongoose.connect("mongodb+srv://Ali:35474597@diy-cluster-ggwdx.gcp.mongodb.net/candles?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
    db.once("open",function(){
        console.log("connected to mongodb");
    });
    console.log("I'm listening");
});
