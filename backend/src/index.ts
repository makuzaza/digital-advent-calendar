import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { Router as authRouter } from "../routes/auth";
import { Router as caasRouter } from "../routes/caas";
import { Router as storageRouter } from "../routes/storage";

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
app.use("/storage", storageRouter);

// Home route
app.get("/", (req, res) => {
  res.send(
    "Welcome to YODA Calendars™️ API 🌟 Your Own Digital Advent Calendars!"
  );
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// connect to Firebase
firebase();
