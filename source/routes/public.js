const express = require("express");
const Router = express.Router();
const public = require("../controllers/publicController")

Router.get("/", public.getProductList);
Router.get("/product/:prodId",public.getProductPage)

module.exports = Router;
