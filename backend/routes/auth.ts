import express from "express";
import { auth } from "../db/firebaseAdmin";

export const Router = express.Router();

// create a new user
Router.post("/signup", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    emailVerified: false,
    displayName: "John Doe",
    photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false,
  };

  auth
    .createUser(user)
    .then((userRecord) => {
      // User created successfully
      res
        .status(200)
        .json({ message: "User created successfully", uid: userRecord.uid });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "Error creating new user", error: error });
    });
});

Router.post("/verifyToken", async (req, res) => {
  const idToken = req.body.idToken;

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;
    // User is authenticated, do your thing...
  } catch (error) {
    res.status(500).json({ message: "Error verifying ID token", error: error });
  }
});

// login a user
Router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const userRecord = await auth.getUserByEmail(email);
    // User found
    res.status(200).json({
      message: "Successfully fetched user data:",
      user: userRecord.toJSON(),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user data", error: error });
  }

  /* auth
    .getUserByEmail(email)
    .then((userRecord) => {
      // User found
      res.status(200).json({
        message: "Successfully fetched user data:",
        user: userRecord.toJSON(),
      });
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
    }); */
});

// get a user
Router.get("/users/:uid", async (req, res) => {
  const uid = req.params.uid;

  auth
    .getUser(uid)
    .then((userRecord) => {
      // User found
      res.status(200).json({
        message: "Successfully fetched user data:",
        user: userRecord.toJSON(),
      });
    })
    .catch((error) => {
      console.log("Error fetching user data:", error);
    });
});
