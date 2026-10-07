const { Conversation } = require("../models/Conversation.models");
const { MessageModel } = require("../models/Messages.models");
const User = require("../models/User.models.js")

const sendMessage = async (req, res) => {

    const { text, receiverId, image } = req.body;
    console.log("Text: ", text, "recieverId: ", receiverId, "senderId", req.user._id);

    const conversation = await Conversation.create({
        participants: [
            req.user._id,
            receiverId
        ]
    })

    const message = await MessageModel.create({
        text,
        senderId: req.user._id,
        conversationId: conversation._id
    })

    return res.status(201).json({
        success: true,
        text: message,
        conversation: conversation
    })

}

const getMessage = async (req, res) => {
    const { userId } = req.params;

    const message = await MessageModel.find({
        senderId: userId
    })

    const messageArray = [];
    message.forEach((obj) => {
        messageArray.push(obj.text);
    })

    return res.status(201).json({
        success: true,
        messages: messageArray
    })
}


const getAllUsers = async (req, res) => {
    const { _id } = req.user._id;
    // getting users from db

    const users = await User.find({
        _id: {
            $ne: {
                _id
            }
        }
    }).select("-password -__v");

    return res.status(201).json({
        success: true,
        users: users
    })
}

module.exports = {
    sendMessage,
    getMessage,
    getAllUsers
}