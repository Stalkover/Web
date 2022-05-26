const Mongoose = require("mongoose")
const UserSchema = new Mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        minlength: 7,
        required: true,
    },
    role: {
        type: String,
        default: "Inactive",
        required: true,
    },
    nickname: String,
    reg_time: {type: Date, default: Date.now}
    }, {collection: 'userdbs'})
const User = Mongoose.model("user", UserSchema)
module.exports = User