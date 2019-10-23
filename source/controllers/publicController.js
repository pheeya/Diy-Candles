const mongoose = require("mongoose");
const Product = require("../Models/product")
module.exports.getProductList = function(req,res,next){

Product.find()
.then(function(products){
    {
        res.render("public/Home", { title:"Home", products:products})
    }
});
}