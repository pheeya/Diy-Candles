const mongoose = require("mongoose");
const Product = require("../Models/product");
const bodyParser = require("body-parser");
var db = mongoose.connection;
module.exports.addProductPost = function(req,res,next){
    var title = req.body.title;
    var imgUrl = req.body.imgUrl;
    var price = req.body.price;
    var description = req.body.description;
var candle = new Product({
    title:title,
    imgUrl:imgUrl,
    price:price,
    description:description
});


 candle.save()
 .then(function(response){
     console.log("new product added!")
 })
}