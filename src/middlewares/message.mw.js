const checkMessageBody = async (req, res, next) => {
    const { text, receiverId } = req.body;
    if (!receiverId) {
        return res.status(202).json({
            success: false,
            message: "ReceiverId Field can't be Empty!"
        })
    }
    next();
}

module.exports = {
    checkMessageBody
}