const jwt = require("jsonwebtoken")
const seckret_key = "JWT-TUTORIAL-SKEY"


/*
    This middleware will sit before an private page. It is implemented but not yet used.
*/

const verifyJwt = (req, res, next) => {
    const token = req.cookies.jwt
    console.log(token)
    if (token) {
        jwt.verify(token, seckret_key, (error, decodedToken) => {
            console.log("Decode token:" + decodedToken)
            if (error) res.status(401).json({ message: "Invalid token" })
            else res.json({ "message": "valid token" })
            next()
        })
    } else {
        console.log("You need to sign in first")
        res.json({ "Message": "You need to sign in first" })
    }
}

module.exports = { verifyJwt }