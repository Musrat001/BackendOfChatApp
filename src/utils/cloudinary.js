
// const dotenv = require("dotenv");
// dotenv.config({
//     path: "../utils/"
// });
const { v2: cloudinary } = require("cloudinary");
// console.log("cloude name", process.env.CLOUDINARY_CLOUD_NAME);
// console.log("cloud api key", process.env.CLOUDINARY_API_KEY);
// console.log("cloude api secret", process.env.CLOUDINARY_API_SECRET);




cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "image"
            },
            (error, result) => {
                if (error) {
                    return reject(error);
                }

                resolve(result);
            }
        );

        uploadStream.end(fileBuffer);
    });
};

module.exports = { uploadOnCloudinary };
