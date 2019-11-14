const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    }
});


userSchema.methods.addToCart = function (product) {
    const cartItemIndex = this.cart.items.findIndex(function (p) {
        return p.productId.toString() === product._id.toString();
    });
    var newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartItemIndex >= 0) {
        newQuantity = this.cart.items[cartItemIndex].quantity + 1;
        updatedCartItems[cartItemIndex].quantity = newQuantity;
        console.log("object already exists in cart, increasing quantity");
    }
    else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
        console.log("object added to cart");
    };

    var updatedCart = {
        items: updatedCartItems
    }
    this.cart = updatedCart;
    return this.save();
}

userSchema.methods.deleteFromCart = function(productId){
    const updatedCartItems = this.cart.items.filter(function(item){
        return item.productId.toString() !== productId.toString();
    });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function(){
    this.cart = {items:[]};
    return this.save();
}


module.exports = mongoose.model("User", userSchema);