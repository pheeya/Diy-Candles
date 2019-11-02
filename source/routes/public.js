const express = require("express");
const Router = express.Router();
const public = require("../controllers/publicController")

Router.get("/", public.getProductList);
Router.get("/product/:prodId",public.getProductPage);
Router.post("/cart", public.cartPOST);
module.exports = Router;
