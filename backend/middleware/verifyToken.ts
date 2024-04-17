import express, { Request, Response, NextFunction } from "express";
import { auth } from "../db/firebaseAdmin";

// Middleware function for token verification and authentication
export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    console.log("Token is required, and it was not provided.");
    return res
      .status(403)
      .json({ success: false, message: "Token is required" });
  }

  // Verify the token
  auth
    .verifyIdToken(token)
    .then((decodedToken) => {
      // Attach the decoded token to the request object for further use
      (req as any).decodedToken = decodedToken;
      next(); // Continue to the next middleware or route handler
    })
    .catch((error) => {
      // Token verification failed
      console.error("Error verifying token:", error);
      return res.status(401).json({ success: false, message: "Unauthorized" });
    });
}
