const mongoose = require("mongoose");
const Product = require("../Models/product");
const Order = require("../Models/order")
const User = require("../Models/user");


module.exports.getProductList = function (req, res, next) {
    Product.find()
        .then(function (products) {
            {
                res.render("public/Home", { title: "Home", products: products, loggedIn: req.session.loggedIn })
            };
        });
};


module.exports.getProductPage = function (req, res, next) {
    Product.findById(req.params.prodId)
        .then(function (product) {
            res.render("public/ProductPage", { title: product.title, product: product, loggedIn: req.session.loggedIn })
        })
        .catch(function (error) {
            console.log(error);
        });
};

module.exports.cartPOST = function (req, res, next) {
    var productId = req.body.productId;
    Product.findById(productId)
        .then(function (product) {
            req.session.user.addToCart(product);
        });
    res.redirect("/product/" + productId);
}

module.exports.cartGet = function (req, res, next) {
    req.session.user.populate("cart.items.productId")
        .execPopulate()
        .then(function (user) {
            var products = user.cart.items;
            res.render("public/Cart", { title: "Your Cart", products: products, loggedIn: req.session.loggedIn })
        })
};

module.exports.deleteFromCart = function (req, res, next) {
    var productId = req.body.productId;
    req.user.deleteFromCart(productId)
        .then(function (x) {
            console.log("deleted product");
            res.redirect("/cart");
        })
        .catch(function (error) {
            console.log(error);
        });
};

module.exports.postOrder = function (req, res, next) {
    req.user.populate("cart.items.productId")
        .execPopulate()
        .then(function (user) {
            var products = user.cart.items.map(function (i) {
                return { quantity: i.quantity, product: { ...i.productId._doc } }
            });
            console.log(products)
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.session.user._id
                },
                products: products
            });
            return order.save()
        })
        .then(function (result) {
            return req.user.clearCart()
        })
        .then(function (result) {
            res.redirect("/checkout");
        })
        .catch(function (error) {
            console.log(error);
        });
};

module.exports.getOrder = function (req, res, next) {
    Order.find({ "user.userId": req.session.user._id })
        .then(function (orders) {
            res.render("public/ConfirmOrder", { title: "Confirm Order", orders: orders, loggedIn: req.session.loggedIn })
        });
};

module.exports.getLogin = function (req, res, next) {
    res.render("public/Login", { title: "Login to your account", loggedIn: req.session.loggedIn })
}

module.exports.getRegister = function (req, res, next) {
    res.render("public/register", { title: "Create Account!", loggedIn: req.session.loggedIn })
}

module.exports.postLogin = function (req, res, next) {
    User.findById("5dbb1975f5de6233485a81c5")
        .then(function (user) {
            req.session.loggedIn = true;
            req.session.user = user;
            console.log(`Connected User: ${user.name}`);
            console.log("Logged In:" + req.session.loggedIn)
            res.redirect("/");
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports.logout = function(req,res,next){
    req.session.destroy(function(){
        res.redirect("/");
    })
}