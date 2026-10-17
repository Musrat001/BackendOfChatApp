// const { socket } = require("../../../Frontend/socket/socket.js");
const { Conversation } = require("../models/Conversation.models");
const { MessageModel } = require("../models/Messages.models");
const User = require("../models/User.models.js");
const { getIO, userSocketMap } = require("../utils/socket.js");
const { uploadOnCloudinary } = require("../utils/cloudinary.js");


// working code without image upload
// const sendMessage = async (req, res) => {
//     const { text, receiverId} = req.body;
//     const io = getIO();
//     // console.log("Text: ", text, "recieverId: ", receiverId, "senderId", req.user._id);
//     const conRoom = await Conversation.findOne({
//         participants: {
//             $all: [req.user._id, receiverId]
//         }

//     })
//     // console.log(conRoom);

//     if (!conRoom) {
//         const conversation = await Conversation.create({
//             participants: [
//                 req.user._id,
//                 receiverId
//             ]
//         })

//         const message = await MessageModel.create({
//             text,
//             senderId: req.user._id,
//             conversationId: conversation._id
//         })

//         const recId = conversation.participants.find(
//             id => id.toString() !== req.user._id.toString()
//         );
//         // const io = getIO();
//         console.log("Emitting newMessage to:", `Receiver:${receiverId}`);
//         io.to(`user:${recId}`).emit("newMessage", message);
//         console.log("receiver id Of Newly Created User", recId);

//         return res.status(201).json({
//             success: true,
//             text: message,
//             conversation: conversation
//         })
//     } else {
//         const message = await MessageModel.create({
//             text,
//             senderId: req.user._id,
//             conversationId: conRoom._id
//         })

//         const recId = conRoom.participants.find(
//             id => id.toString() !== req.user._id.toString()
//         );
//         console.log("receiverId Of Exited User", recId);


//         // emit new message to user sockets
//         const room = `user:${recId}`;

//         console.log("Target room:", room);

//         const socketsInRoom = await io.in(room).fetchSockets();

//         console.log(
//             "Sockets in receiver room:",
//             socketsInRoom.length
//         );

//         io.to(room).emit("newMessage", message);

//         // const receiverSocketId = userSocketMap[recId];
//         console.log("Emitting newMessage to:", `user:${receiverId}`);
//         io.to(`user:${recId}`).emit("newMessage", message);


//         return res.status(201).json({
//             success: true,
//             text: message,
//             conversation: conRoom
//         })

//     }


// }


const sendMessage = async (req, res) => {
    try {
        const { text, receiverId } = req.body;
        const io = getIO();

        let imageUrl = "";

        // Upload image only if one is provided
        if (req.file) {
            const result = await uploadOnCloudinary(req.file.buffer);
            imageUrl = result.secure_url;
        }

        // Find existing conversation
        let conversation = await Conversation.findOne({
            participants: {
                $all: [req.user._id, receiverId]
            }
        });

        // Create conversation if it doesn't exist
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [
                    req.user._id,
                    receiverId
                ]
            });
        }

        // Create message with text and optional image
        const message = await MessageModel.create({
            text: text,
            image: imageUrl || null,
            senderId: req.user._id,
            conversationId: conversation._id
        });

        // Find receiver
        const recId = conversation.participants.find(
            id => id.toString() !== req.user._id.toString()
        );

        // Emit message to receiver
        const room = `user:${recId}`;

        io.to(room).emit("newMessage", message);

        return res.status(201).json({
            success: true,
            message,
            conversation
        });

    } catch (error) {
        console.error("Send message error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = { sendMessage };


const getMessage = async (req, res) => {
    const { userId } = req.params;


    const conRoom = await Conversation.findOne({
        participants: {
            $all: [req.user._id, userId]
        }

    })
    if (!conRoom) {
        return res.status(200).json({
            success: true,
            messages: [],
            conversationRoom: null
        })
    }

    const messages = await MessageModel.find({
        conversationId: conRoom._id

    })

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