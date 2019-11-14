const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var productSchema = new Schema({
    title:String,
    imgUrl:String,
    price:Number,
    description:String,
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
});

var Product = mongoose.model("Product", productSchema);

module.exports = Product;