const express = require('express')
const bodyParser = require('body-parser')
const CORS = require('cors')
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const seckret_key = "JWT-TUTORIAL-SKEY"
const app = express()
const MongoDBURI = "mongodb+srv://Dhamu02:Dhamu_2002@cluster0.vwz9a1d.mongodb.net/JWT_tutorialDB?retryWrites=true&w=majority&appName=Cluster0"

async function connectToMongoDB() {
    try {
        await mongoose.connect(MongoDBURI)
        console.log('Connected to MongoDB Atlas')
    } catch (error) {
        console.log(error)
        if (error.code === "ETIMEOUT") {
            console.log("Unable to connect to mongodb")
        }
    }
    app.listen(2002, () => console.log("Server running.."))
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




//-----------------------Testing Route---------------------------//
// app.post("/test", (req, res) => {
//     console.log(req.body.email, req.body.password)
// })

// app.post("/verify-jwt", (req, res) => {
//     console.log(req.cookies.jwt)
//     res.sendStatus(200)
// })
