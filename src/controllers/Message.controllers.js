const { Conversation } = require("../models/Conversation.models");
const { MessageModel } = require("../models/Messages.models");
const User = require("../models/User.models.js")

const sendMessage = async (req, res) => {

    const { text, receiverId, image } = req.body;
    console.log("Text: ", text, "recieverId: ", receiverId, "senderId", req.user._id);


    const conRoom = await Conversation.findOne({
        participants: {
            $all: [req.user._id, receiverId]
        }

    })
    console.log(conRoom);

    if (!conRoom) {
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
    } else {
        const message = await MessageModel.create({
            text,
            senderId: req.user._id,
            conversationId: conRoom._id
        })

        return res.status(201).json({
            success: true,
            text: message,
            conversation: conRoom
        })

    }


}

const getMessage = async (req, res) => {
    const { userId } = req.params;


    const conRoom = await Conversation.find({
        participants: {
            $all: [req.user._id, userId]
        }

    })

    const messages = await MessageModel.find({
        conversationId: conRoom[0]._id

    })

    // const messagesOfReceiver = await MessageModel.find({
    //     senderId: req.user._id
    // })

    // const messageArrayOfSender = [];
    // const messageArrayOfReceiver = [];
    // messageOfSender.forEach((obj) => {
    //     messageArrayOfSender.push(obj.text);
    // })
    // messagesOfReceiver.forEach((obj) => {
    //     messageArrayOfReceiver.push(obj.text);
    // })

    return res.status(201).json({
        success: true,
        messages: messages,
        conversationRoom: conRoom

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