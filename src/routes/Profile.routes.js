const express = require("express");
const { createProfile } = require("../controllers/Profile.controllers");
const { verifyJWT } = require("../middlewares/Auth.mw");

const router = express.Router();

router.post("/createProfile", verifyJWT, createProfile)


module.exports = router;