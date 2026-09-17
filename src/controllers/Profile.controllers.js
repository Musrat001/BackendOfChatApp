const Profile = require("../models/Profile.models.js");


const createProfile = async (req, res) => {
    // console.log("Create profile is called");

    const { about } = req.body;

    const profileObj = {
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
        about: about
    }

    const profile = await Profile.create(profileObj);

    return res.status(201).json({
        success: true,
        message: "Profile created successfully",
        profile: profile
    })


    // console.log("End of create Profile");



}

module.exports = {
    createProfile
}