const { default: mongoose } = require("mongoose")
const usersModel = require("../models/Users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const seckret_key = "JWT-TUTORIAL-SKEY"
const maxAge = 3600

function createJWT(id) {
    const token = jwt.sign({id}, seckret_key, { expiresIn: maxAge })
    return token
}


module.exports.postSignin = async (req, res, next) => {
    try {
        const doc = await usersModel.findOne({ email: req.body.email })
        if(doc === null) return res.json({ "message": "Invalid credentials" })
        const hasedPassword = await bcrypt.hash(req.body.password, doc.salt)
        if (hasedPassword !== doc.password) return res.json({ "message": "Invalid credentials" })
            else {
            const token = createJWT(doc.id)
            res.cookie("jwt", token, { maxAge: maxAge * 1000 })
            res.status(200).json({"message":"success"})
        }
    } catch (error) {
        console.log(error)
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
        const token = createJWT(doc._id)
        res.cookie("jwt", token, { maxAge: maxAge * 1000 })
        res.status(200).redirect("/")
    } catch (error) {
        console.log(error)
        if (error instanceof mongoose.Error && error.errorResponse.errmsg.includes("E11000")) {

            return res.status(400).json({ "message": "email id already exists" })
        }
        else {
            console.log(error)
            res.json(error)
        }
    }
}