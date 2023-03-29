const express = require("express")
const CartModel = require("../models/cart.model")
const CartRouter = express.Router()
const jwt = require('jsonwebtoken');
const auth = require("../middlewares/auth.middleware");

CartRouter.use(auth)

CartRouter.get("/", async (req, res) => {
    const { userId } = req.body

    try {
        const cartItems = await CartModel.find({ $and: [{ userId }] })
        res.status(200).send(cartItems)
    } catch (error) {
        res.status(400).send({
            "message": error.message
        })
    }
})

CartRouter.post("/add", async (req, res) => {
    console.log(req.body)
    try {
        const Item = new CartModel(req.body)
        await Item.save()
        res.status(200).send({
            "message": "Item successfully created",
            item: Item

        })
    } catch (error) {
        res.status(400).send({
            "message": error.message
        })
    }
})


CartRouter.patch("/update/:itemId", async (req, res) => {
    const id = req.params.itemId
    const changes = req.body
    try {
        const updatedItem = await CartModel.findByIdAndUpdate({ _id: id }, changes)
        res.status(200).send({
            "message": "Item successfully updated",
            updatedItem
        })
    } catch (error) {
        res.status(400).send({
            "message": error.message
        })
    }
})

CartRouter.delete("/delete/:itemId", async (req, res) => {
    const id = req.params.itemId
    const token = req.headers.auth.split(" ")[1]
    const note = await CartModel.findOne({ _id: id })
    if (token) {
        const decoded = jwt.verify(token, process.env.keyword);
        if (decoded.userId === note.userId) {
            try {
                const deletedItem = await CartModel.findByIdAndDelete({ _id: id })
                res.status(200).send({
                    "message": "Item successfully deleted",
                    deletedItem
                })
            } catch (error) {
                res.status(400).send({
                    "message": error.message
                })
            }
        } else {
            res.status(400).send({
                "message": "Authorization Failed"
            })
        }
    } else {
        res.status(400).send({
            "message": "Authorization Failed"
        })
    }
})

module.exports = CartRouter