
const PushSubscription = require("../models/PushSubscription.models.js");
const savePushSubscription = async (req, res) => {
    try {
        const userId = req.user._id;
        const { endpoint, keys } = req.body;

        if (!endpoint || !keys?.p256dh || !keys?.auth) {
            return res.status(400).json({
                success: false,
                message: "Invalid push subscription",
            });
        }

        const subscription = await PushSubscription.findOneAndUpdate(
            { endpoint },
            {
                userId,
                endpoint,
                keys: {
                    p256dh: keys.p256dh,
                    auth: keys.auth,
                },
            },
            {
                upsert: true,
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Push subscription saved successfully",
        });
    } catch (error) {
        console.error("Save push subscription error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to save push subscription",
        });
    }
};

module.exports = { savePushSubscription };

