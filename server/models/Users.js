const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: false,
        unique: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true,
    },
    salt: {
        type: String
    }
})

/*
    this points to local copy of users schema object that is store locally in memory 
    before saving it database, that's why when can update the password field of users
    object with hashed password before saving it.
 */
usersSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt()
    this.salt = salt
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel