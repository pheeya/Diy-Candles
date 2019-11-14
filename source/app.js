const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const User = require("./Models/user");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);


const MONGODB_URI = "mongodb+srv://Ali:35474597@diy-cluster-ggwdx.gcp.mongodb.net/candles";
var db = mongoose.connection;

const app = express();
const store = new mongoDbStore({
    uri:MONGODB_URI,
    collection:"sessions"
});
//importing routes
const publicRoutes = require("./routes/public");
const adminRoutes = require("./routes/admin");


//compulsary middleware
app.engine("handlebars", handlebars());
app.set("view engine", "handlebars");
app.set("views", "views")


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"35474597", resave:false, saveUninitialized:false, store: store}));


//Routes
app.use(publicRoutes);
app.use("/admin", adminRoutes)


app.use(function (req, res, next) {
    res.status(404).render('404', { title: "no such page" })
});


app.listen(3000, function () {
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(function (result) {
            User.findOne()
                .then(function (user) {
                    if (!user) {
                        const user = new User({
                            name: "sameer",
                            email: "sameerahmed1472@gmail.com",
                            cart: {
                                items: []
                            }
                        });
                        user.save();
                    };
                });

        });
    db.once("open", function () {
        console.log("connected to mongodb");
    });
    console.log("I'm listening");
});
