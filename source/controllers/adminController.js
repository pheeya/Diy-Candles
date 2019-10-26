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
     console.log("new product added!");
     res.redirect("/")
 });
};


module.exports.getAdminShop = function(req,res,next){
    Product.find()
  .then(function(products){
    res.render("admin/AdminShop", {title:"Admin Shop", products:products});
  })
  .catch(function(error){
      console.log(error)
  });
};

module.exports.deleteProduct = function(req,res,next){
    var prodId = req.body.prodId;

    Product.findByIdAndRemove(prodId)
    .then(function(success){
        console.log("deleted product");
        res.redirect("/admin/shop")
    })
}
