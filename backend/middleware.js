const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header.authorization;
    if (!authHeader || !authHeader?.startWith("Bearer")) {
        return res.status(403).json({});
    }
    const token = authHeader.split(" ")[1];
    try {
        const result = jwt.verify(token, JWT_SECRET);
        if (result) {
            req.userId = result.userId;
            next();
        }
    } catch (error) {
        return res.status(403).json({});
    }
};

module.exports = {
    authMiddleware,
};
