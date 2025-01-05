const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader?.startsWith("Bearer")) {
        return res.status(403).json({})
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
