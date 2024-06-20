const router = require("express").Router()
const authController = require("../controllers/authController")

router.post('/signin', authController.postSignin)
router.post('/signup', authController.postSignup)

module.exports = router