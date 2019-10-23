const express = require("express");
const Router = express.Router();
const public = require("../controllers/publicController")
Router.get("/", public.getProductList);


module.exports = Router;
