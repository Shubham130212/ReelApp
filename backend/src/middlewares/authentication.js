const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenicateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized - No token provided" })
    }
    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
    
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
            console.log("JWT Error:", err.message);
            return res.status(401).json({ error: "Token is invalid or expired" })
        }
        req.email = decode.email;  // Extract email from decoded token
        req.user = decode;         // Store full decoded token
        next();
    });
}

module.exports = authenicateJwt;