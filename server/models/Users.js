const mongoose = require("mongoose")

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
    }
})

const usersModel = mongoose.model('users', usersSchema)

module.exports = usersModel