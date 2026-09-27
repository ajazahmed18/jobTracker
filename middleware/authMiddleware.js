const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    // Get token from request header
    const token = req.headers.authorization;

    // Check token exists
    if (!token) {
        return res.status(401).send({
            message: "Token required"
        });
    }

    try {

        // Verify token
        const decoded = jwt.verify(
            token,
            "mysecretkey"
        );

        // Store decoded user information
        req.user = decoded;

        // Continue to next middleware or function
        next();

    } catch (err) {

        res.status(401).send({
            message: "Invalid or expired token"
        });

    }
};

module.exports = verifyToken;