const express = require("express");
const authRoutes = require("./routes/Auth.routes.js");
const app = express();
const profileRoutes = require("./routes/Profile.routes.js")
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors(
    {
        origin: "http://localhost:5173",
         credentials: true
    }
));
app.use(express.json());
app.use(cookieParser())


//Authentication routes
app.use("/api/v1/auth", authRoutes)

//Profile Routes

app.use("/api/v1/profile", profileRoutes)




module.exports =
    app


