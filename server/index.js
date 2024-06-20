const express = require('express')
const bodyParser = require('body-parser')
const CORS = require('cors')
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth")

const app = express()
const MongoDBURI = "mongodb+srv://Dhamu02:Dhamu_2002@cluster0.vwz9a1d.mongodb.net/JWT_tutorialDB?retryWrites=true&w=majority&appName=Cluster0"

async function connectToMongoDB() {
    await mongoose.connect(MongoDBURI)
    console.log('Connected to MongoDB Atlas')
    app.listen(2002, () => console.log("Server running.."))
}
connectToMongoDB()
app.use(CORS())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use("/auth", authRoutes)


//-----------------------Testing Route---------------------------//
// app.post("/test", (req, res) => {
//     console.log(req.body.email, req.body.password)
// })
