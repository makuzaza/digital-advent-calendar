import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { authRouter } from "../routes/auth";
import { caasRouter } from "../routes/caas";

import firebase from "../db/firebaseAdmin";

const app = express();

config();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRouter);
app.use("/caas", caasRouter);

// Home route
app.get("/", (req, res) => {
  res.send(
    "Welcome to YODA Calendars™️ API 🌟 Your Online Digital Advent Calendars!"
  );
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// connect to Firebase
firebase();
