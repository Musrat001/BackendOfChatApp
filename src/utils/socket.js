let io;

const userSocketMap = {};

const setIO = (ioInstance) => {
    io = ioInstance;
};

const getIO = () => {
    return io;
};

module.exports = {
    setIO,
    getIO,
    userSocketMap
};

