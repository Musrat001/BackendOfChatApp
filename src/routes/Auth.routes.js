const express = require("express");
const { registerUser, logOut, getMe } = require("../controllers/Auth.controllers.js")
const { loginUser } = require("../controllers/Auth.controllers.js");
const { verifyJWT } = require("../middlewares/Auth.mw.js");

const router = express.Router();

router.post("/signUp", registerUser)
router.post("/signIn", loginUser)
router.get("/logout", verifyJWT, logOut)
router.get("/getMe", verifyJWT, getMe);


module.exports = router;