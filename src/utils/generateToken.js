const jwt = require("jsonwebtoken");


const generateAccessToken = (_id) => {
    const token = jwt.sign({
        userId: _id
    },
        process.env.ACCESS_TOKEN_SECRETE,
        {
            expiresIn: "1h"
        }
    )

    return token;
}

module.exports = {
    generateAccessToken
}