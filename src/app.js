const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/Auth.routes.js");
const profileRoutes = require("./routes/Profile.routes.js");
const messageRoutes = require("./routes/Message.routes.js");
// const { Conversation } = require("../src/models/Conversation.models.js")

const cookieParser = require("cookie-parser");
const cors = require("cors");

const { setIO, userSocketMap } = require("./utils/socket.js");

const app = express();

app.use(express.json());
const allowedOrigins = [

    "https://fronend-of-chat-app.vercel.app",
    "http://localhost:5173"
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

// Create HTTP server
const server = createServer(app);

// Express CORS configuration
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }));

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Make the Socket.IO instance available through socket.js
setIO(io);
const getUserSocketId = (userId) => {
    return userSocketMap[userId];
}

console.log("Current User Siocket Id:", getUserSocketId);


// Socket connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query?.userId;

    if (!userId) {
        console.log("User ID missing");
        socket.disconnect();
        return;
    }

    userSocketMap[userId] = socket.id;

    // Join the user's personal room

    socket.join(`user:${userId}`);

    console.log("User joined room:", `user:${userId}`);

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        if (userSocketMap[userId] === socket.id) {
            delete userSocketMap[userId];
        }

        console.log("Disconnected user:", userId);

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// io.on("connection", (socket) => {
//     console.log("New socket connection:", socket.id);
//     console.log("Handshake query:", socket.handshake.query);

//     const userId = socket.handshake.query?.userId;

//     if (!userId) {
//         console.log("User ID missing for socket:", socket.id);
//         socket.disconnect();
//         return;
//     }

//     userSocketMap[userId] = socket.id;

//     socket.join(`user:${userId}`);

//     console.log("User joined room:", `user:${userId}`);

//     io.emit("getOnlineUsers", Object.keys(userSocketMap));

//     socket.on("disconnect", () => {
//         if (userSocketMap[userId] === socket.id) {
//             delete userSocketMap[userId];
//         }

//         console.log("Disconnected user:", userId);

//         io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     });
// });

// Express middleware

app.use(cookieParser());

// Authentication routes
app.use("/api/v1/auth", authRoutes);

// Profile routes
app.use("/api/v1/profile", profileRoutes);

// Message routes
app.use("/api/v1/message", messageRoutes);

// Routes to push notification
const pushSubscriptionRoutes = require("./routes/PushSubscription.routes.js");

app.use("/api/v1/push", pushSubscriptionRoutes);

// Export required objects
module.exports = {
    app,
    server,
    io,
    userSocketMap,
    getUserSocketId
};