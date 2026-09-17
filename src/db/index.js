const mongoose = require("mongoose");



const connectDb = async () => {
    try {
        const connectionObj = await mongoose.connect(process.env.MONGODB_URI);

    } catch (error) {
        console.log("Error While connecting to Database.");
        console.log(error.message);

    }
}

module.exports = connectDb;
