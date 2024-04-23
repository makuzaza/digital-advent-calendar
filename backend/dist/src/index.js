"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const auth_1 = require("../routes/auth");
const firestore_1 = require("../routes/firestore");
const storage_1 = require("../routes/storage");
const firebaseAdmin_1 = __importDefault(require("../db/firebaseAdmin"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/auth", auth_1.Router);
app.use("/firestore", firestore_1.Router);
app.use("/storage", storage_1.Router);
// Home route
app.get("/", (req, res) => {
    res.send("Welcome to YODA Calendars™️ API 🌟 Your Own Digital Advent Calendars!");
});
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";
app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
// connect to Firebase
(0, firebaseAdmin_1.default)();
//# sourceMappingURL=index.js.map