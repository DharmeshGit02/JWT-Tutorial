const { MongooseError, default: mongoose } = require("mongoose")
const usersModel = require("../models/Users")



module.exports.postSignin = async (req, res, next) => {
    try {
        const doc = await usersModel.findOne({ email: req.body.email, password: req.body.password })
        console.log(doc, typeof doc, doc === null)
        if (doc === null) return res.json({ "message": "Invalid credentials" })
        else res.status(200).json({ "message": "success" })
    } catch (error) {
        res.status(400).json({ "incorrect": "request parameters" })
    }
}

module.exports.postSignup = async (req, res, next) => {
    try {
        const usersModelObj = new usersModel()
        usersModelObj.email = req.body.email
        usersModelObj.password = req.body.password
        const doc = await usersModelObj.save()
        console.log(doc)
        res.status(200).json({ "message": "successfully signed in" })
    } catch (error) {
        if (error.errorResponse.errmsg.includes("E11000")) return res.status(400).json({ "message": "email id already exists" })
        res.json(error)
    }
}