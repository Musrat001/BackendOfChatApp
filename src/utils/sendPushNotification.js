const webpush = require("./webPush");

async function sendPushNotification(subscription, payload) {
    try {
        await webpush.sendNotification(
            subscription,
            JSON.stringify(payload)
        );

        return true;
    } catch (error) {
        console.error("Push notification error:", error.statusCode);

        if (error.statusCode === 404 || error.statusCode === 410) {
            console.log("Push subscription has expired or is no longer valid.");
        }

        return false;
    }
}

module.exports = { sendPushNotification };