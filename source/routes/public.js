const express = require("express");
const Router = express.Router();
const public = require("../controllers/publicController")

Router.get("/", public.getProductList);
Router.get("/product/:prodId",public.getProductPage);

Router.post("/cart", public.cartPOST);
Router.get("/cart", public.cartGet);
Router.post("/cart/delete",public.deleteFromCart);

Router.post("/checkout", public.postOrder);
Router.get("/checkout", public.getOrder);

Router.get("/login", public.getLogin);
Router.post("/login", public.postLogin);
Router.get("/register", public.getRegister);
Router.post("/logout", public.logout)
module.exports = Router;
