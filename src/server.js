const app = require("./app.js");
const dotenv = require("dotenv");
dotenv.config();
const connectDb = require("./db/index.js")

const db = async () => {
    try {
        await connectDb();
        console.log("Database Connected succesfully");
    } catch (error) {
        console.log("Error", error.message);

    }

}

db();


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port number ${process.env.PORT}`);

})