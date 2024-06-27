const express = require('express')
const bodyParser = require('body-parser')
const CORS = require('cors')
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
require('dotenv').config()


const seckret_key = process.env.SECRET_KEY
const MongoDBURI = process.env.mongoDB_URI

const authRoutes = require("./routes/auth")
const productsRoutes = require('./routes/products')

const app = express()

app.listen(2002, () => console.log("Server running.."))
async function connectToMongoDB() {
    try {
        await mongoose.connect(MongoDBURI)
        console.log('Connected to MongoDB Atlas')
    } catch (err) {
        console.log(err)
    }
} 

connectToMongoDB()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/verify-jwt", (req, res) => {
    /*
        This route is used to check if user have valid token then in navbar sign in & sign up options
        will not be visible.
        This route is only for authentication functionality for navbar for now
     */
    const token = req.cookies.jwt
    jwt.verify(token, seckret_key, (error, decodedToken) => {
        if (error) res.status(401).json({ "message": "Inavlid Token" })
        else res.status(200).json({ "message": "valid token" })
    })
})

app.use("/auth", authRoutes)
app.use("/products", productsRoutes)




//-----------------------Testing Route---------------------------//
// app.post("/test", (req, res) => {
//     console.log(req.body.email, req.body.password)
// })

// app.post("/verify-jwt", (req, res) => {
//     console.log(req.cookies.jwt)
//     res.sendStatus(200)
// })
