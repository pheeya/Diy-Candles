const express = require("express");
const path = require("path");
const bodyParser=require("body-parser");
const handlebars = require("express-handlebars");

const app = express();
//importing routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");


//compulsary middleware
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.set("views", "views")


app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use(userRoutes);
app.use("/admin", adminRoutes)


app.use(function(req,res,next){
    res.status(404).render('404', {title:"no such page"})
});


app.listen(3000, function(){
    console.log("I'm listening")
});
