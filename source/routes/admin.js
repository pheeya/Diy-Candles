const express = require("express");
const Router = express.Router();
const admin = require("../controllers/adminController")

Router.get("/add-product", function(req,res,next){
    res.render('admin/AddProduct', {title:"Add a product"})
});

Router.post("/add-product", admin.addProductPost)

Router.get("/shop", admin.getAdminShop);

Router.post("/delete-product", admin.deleteProduct)



module.exports = Router;
