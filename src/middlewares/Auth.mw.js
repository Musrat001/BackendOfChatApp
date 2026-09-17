const jwt = require("jsonwebtoken");
const User = require("../models/User.models.js")

const verifyJWT = async (req, res, next) => {

    const token = req.cookies.accessToken;
    // console.log("Token from the headers:", token);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Please provide Token"
        })
    }
    try {
        const decodedId = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE);
        const user = await User.findById(decodedId.userId ).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Doesn't exits"
            })
        }
        // console.log(user);


        req.user = user;
        next();
   


    } catch (error) {

        return res.status(402).json({
            success: false,
            message: error.message
        })

    }


}

module.exports = {
    verifyJWT
}