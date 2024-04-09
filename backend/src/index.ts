import express from "express";
import cors from "cors";
import { config } from "dotenv";

import firebase from "../db/firebaseAdmin";

const app = express();

config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(
    "Welcome to YODA Calendars™️ API 🌟 Your Online Digital Advent Calendars!"
  );
});

// this route takes in the singup data and returns the user object
// this is a mock route, in a real-world scenario, you would create a user in the firebase auth
app.post("/signup", async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    emailVerified: false,
    disabled: false,
  };

  res.json(user);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// connect to firebase
firebase();
