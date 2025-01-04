const { MONGODB_URL } = require("../config/serverConfig");
const mongoose = require("mongoose");

const connectDb = () => {
    mongoose
        .connect(MONGODB_URL)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.error("Failed to connect to MongoDB:", err));
};
module.exports = {
    connectDb,
};
