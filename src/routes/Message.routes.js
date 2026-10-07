const express = require("express");
const { sendMessage, getMessage, getAllUsers } = require("../controllers/Message.controllers.js")
const { verifyJWT } = require("../middlewares/Auth.mw.js")


const router = express.Router();

router.post("/send", verifyJWT, sendMessage);
router.get("/receivedMessage/:userId", verifyJWT, getMessage);
router.get("/users", verifyJWT, getAllUsers);

module.exports = router;