const mongoose = require("mongoose");
const Product = require("../Models/product");
const bodyParser = require("body-parser");
var db = mongoose.connection;
module.exports.addProductPost = function (req, res, next) {
    var title = req.body.title;
    var imgUrl = req.body.imgUrl;
    var price = req.body.price;
    var description = req.body.description;
    var candle = new Product({
        title: title,
        imgUrl: imgUrl,
        price: price,
        description: description,
        userId:req.session.user._id
    });


    candle.save()
        .then(function (response) {
            console.log("new product added!");
            res.redirect("/")
        });
};


module.exports.getAdminShop = function (req, res, next) {
    Product.find()
        .then(function (products) {
            res.render("admin/AdminShop", { title: "Admin Shop", products: products, loggedIn:req.session.loggedIn });
        })
        .catch(function (error) {
            console.log(error)
        });
};

module.exports.deleteProduct = function (req, res, next) {
    var prodId = req.body.prodId;

    Product.findByIdAndRemove(prodId)
        .then(function (success) {
            console.log("deleted product");
            res.redirect("/admin/shop")
        })
};

module.exports.getEditPage = function (req, res, next) {
var prodId = req.params.prodId;
Product.findById(prodId)
.then(function(product){
    res.render("admin/EditProduct", {title:"Edit Product", product:product, loggedIn:req.session.loggedIn })
});
};

module.exports.postEditPage = function (req,res,next){
var prodId = req.body.prodId;
var title = req.body.title;
var imgUrl = req.body.imgUrl;
var price = req.body.price;
var description = req.body.description;
Product.findById(prodId)
.then(function(product){
    product.title = title;
    product.imgUrl = imgUrl;
    product.price = price;
    product.description= description;
product.save();
res.redirect("/admin/shop");
})
}
