const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
        
    },
    avatar: {
        type: String

    },
    about: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Profile", ProfileSchema);