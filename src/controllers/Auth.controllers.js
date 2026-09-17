const bcrypt = require("bcrypt");
const User = require("../models/User.models.js")
const { generateAccessToken } = require("../utils/generateToken.js")
const registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);


    // creating User in the Database
    const user = await User.create({
        name,
        username,
        email,
        password: hashPassword
    })

    res.status(201).json({
        success: true,
        message: "You Sign Up Successfully",
        registredUser: user
    });

}

const loginUser = async (req, res) => {
    console.log(req.body)
    const { identifier, password } = req.body;
    const user = await User.findOne({
        $or: [
            {
                username: identifier
            },
            {
                email: identifier
            }
        ]
    })

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Doesnot Exits"
        })
    }
    // console.log(user);


    let isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(501).json({
            success: false,
            message: "Password is wrong!"
        })
    }

    const accessToken = generateAccessToken(user._id);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none"

    })

    return res.status(201).json({
        success: true,
        message: "You logged in successfully",
        accessToken: accessToken
    })

}

const logOut = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        return res.status(200).json({
            message: "Logout Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Logout Failed !"
        })
    }
}
module.exports = {
    registerUser,
    loginUser,
    logOut
}