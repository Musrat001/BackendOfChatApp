const dotenv = require("dotenv");
dotenv.config();

const { server } = require("./app.js");
const connectDb = require("./db/index.js");


const PORT = process.env.PORT;

const startServer = async () => {
    try {
        await connectDb();

        console.log("Database connected successfully");

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Server startup error:", error.message);
        process.exit(1);
    }
};

startServer();