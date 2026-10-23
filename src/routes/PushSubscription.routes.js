const express = require("express");
const router = express.Router();

const { savePushSubscription } = require("../controllers/pushSubscription.controllers");
const {verifyJWT} = require("../middlewares/Auth.mw.js");

router.post("/subscribe", verifyJWT, savePushSubscription);

module.exports = router;

