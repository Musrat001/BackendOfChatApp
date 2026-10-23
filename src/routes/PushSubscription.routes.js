const express = require("express");
const router = express.Router();

const { savePushSubscription } = require("../controllers/PushSubscription.controllers");
const {verifyJWT} = require("../middlewares/Auth.mw.js");

router.post("/subscribe", verifyJWT, savePushSubscription);

module.exports = router;

