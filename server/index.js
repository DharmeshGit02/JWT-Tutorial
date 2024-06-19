const express = require('express')
const bodyParser = require('body-parser')
const CORS = require('cors')

const app = express()

app.use(CORS())

app.get("/", (req, res) => {
    console.log("Hello")
    res.json("Hello from server")
})

app.listen(2002, () => console.log("Server Running.."))