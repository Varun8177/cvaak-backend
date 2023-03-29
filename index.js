const express = require("express")
const Connection = require("./config/db")
const CartRouter = require("./routes/cart.route")
const userRouter = require("./routes/user.routes")
const cors = require("cors")
const productRouter = require("./routes/product.route")
const app = express()
require("dotenv").config()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send({
        message: "Home page"
    })
})

app.use("/users", userRouter)
app.use("/cart", CartRouter)
app.use("/products", productRouter)


app.listen(process.env.port, async () => {
    try {
        await Connection
        console.log("Connected to Database")
    } catch (error) {
        console.log(error.message)
    }
    console.log(`Server running at port ${process.env.port}`)
})