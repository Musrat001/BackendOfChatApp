const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
    },

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    text: {
        type: String
    },
    image: {
        type: String
    }
})

const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = {
    MessageModel
}