const mongoose = require("mongoose")

const cartSchema = mongoose.Schema({
    "title": String,
    "src": String,
    "packsize": String,
    "price": Number,
    "strike-price": String,
    "discount-percent": String,
    "qty": Number,
    "rating": String,
    "CardRatingDetail": String,
    "description": String,
    "category": String,
    "userId": String
}, {
    versionKey: false
})

const CartModel = mongoose.model("cart", cartSchema)

module.exports = CartModel