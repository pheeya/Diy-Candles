const mongoose = require("mongoose");
const Product = require("../Models/product")


module.exports.getProductList = function(req,res,next){
Product.find()
.then(function(products){
    {
        res.render("public/Home", { title:"Home", products:products})
    };
});
};


module.exports.getProductPage = function(req,res,next){
    Product.findById(req.params.prodId)
    .then(function(product){
        res.render("public/ProductPage", {title:product.title, product:product})
    })
    .catch(function(error){
        console.log(error);
    });
};