const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    title:String,
    imgUrl:String,
    price:Number,
    description:String
});

var Product = mongoose.model("Product", productSchema);

module.exports = Product;