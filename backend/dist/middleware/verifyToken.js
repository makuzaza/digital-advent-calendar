"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const firebaseAdmin_1 = require("../db/firebaseAdmin");
// Middleware function for token verification and authentication
function verifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        console.log("Token is required, and it was not provided.");
        return res
            .status(403)
            .json({ success: false, message: "Token is required" });
    }
    // Verify the token
    firebaseAdmin_1.auth
        .verifyIdToken(token)
        .then((decodedToken) => {
        // Attach the decoded token to the request object for further use
        req.decodedToken = decodedToken;
        next(); // Continue to the next middleware or route handler
    })
        .catch((error) => {
        // Token verification failed
        console.error("Error verifying token:", error);
        return res.status(401).json({ success: false, message: "Unauthorized" });
    });
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map