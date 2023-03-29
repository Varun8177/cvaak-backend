const express = require("express");
const adminAuth = require("../middlewares/adminAuth.middleware");
const ProductModel = require("../models/product.model");
const productRouter = express.Router()

productRouter.get("/", async (req, res) => {
    const query = req.query
    const categoryQuery = {}
    if (query.category) {
        categoryQuery["category"] = query.category
    }
    console.log(categoryQuery)

    try {
        const notes = await ProductModel.find({ $and: [categoryQuery] })
        res.status(200).send(notes)
    } catch (error) {
        res.status(400).send({
            "message": error.message
        })
    }
})


productRouter.post("/add", adminAuth, async (req, res) => {
    try {
        const product = new ProductModel(req.body)
        await product.save()
        res.status(200).send({
            "message": "Product successfully created"
        })
    } catch (error) {
        res.status(400).send({
            "message": error.message
        })
    }
})


productRouter.patch("/update/:productId", adminAuth, async (req, res) => {
    const id = req.params.productId
    const changes = req.body
    try {
        const new_note = await ProductModel.findByIdAndUpdate({ _id: id }, changes)
        res.status(200).send({
            "message": "Note successfully updated"
        })
    } catch (error) {
        res.status(400).send({
            "message": error.message
        })
    }
})



productRouter.delete("/delete/:productId", adminAuth, async (req, res) => {
    const id = req.params.productId
    const prod = await ProductModel.findOne({ _id: id })
    try {
        const product = await ProductModel.findByIdAndDelete({ _id: id })
        res.status(200).send({
            "message": "Product successfully deleted",
            product
        })
    } catch (error) {
        res.status(400).send({
            "message": error.message
        })
    }
})

module.exports = productRouter