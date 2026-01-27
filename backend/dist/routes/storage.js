"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const verifyToken_1 = require("../middleware/verifyToken");
exports.Router = express_1.default.Router();
// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uid = req.body.uid;
        const userDir = path.join(uploadsDir, uid || "anonymous");
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
        }
        cb(null, userDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage });
// ALL FILES
// Endpoint to get list of all the files in storage
exports.Router.get("/files", async (req, res) => {
    try {
        // Read all files from uploads directory
        const files = fs.readdirSync(uploadsDir);
        res.status(200).json(files);
    }
    catch (error) {
        console.error("Error fetching files:", error);
        res.status(500).send("Internal Server Error");
    }
});
// Endpoint to get list of all the files by uid in storage
exports.Router.get("/files/:uid", async (req, res) => {
    try {
        const uid = req.params.uid;
        const userDir = path.join(uploadsDir, uid);
        if (!fs.existsSync(userDir)) {
            return res.status(200).json([]);
        }
        const fileNames = fs.readdirSync(userDir);
        res.status(200).json(fileNames);
    }
    catch (error) {
        console.error("Error fetching files:", error);
        res.status(500).send("Internal Server Error");
    }
});
// IMAGES
// Endpoint to download image
exports.Router.get("/images/:imageName", async (req, res) => {
    try {
        const imageName = req.params.imageName;
        let ownerUid = req.query.ownerUid;
        // console.log("=== GET /images/:imageName ===");
        // console.log("imageName:", imageName);
        // console.log("ownerUid:", ownerUid);
        // console.log("uploadsDir:", uploadsDir);
        if (!imageName) {
            return res.status(400).json({ error: "Missing imageName" });
        }
        // If ownerUid is provided, try that path first
        if (ownerUid) {
            const imagePath = path.join(uploadsDir, ownerUid, imageName);
            // console.log("Trying path:", imagePath);
            // console.log("Path exists?", fs.existsSync(imagePath));
            if (fs.existsSync(imagePath)) {
                console.log("File found!");
                return res.sendFile(imagePath);
            }
            else {
                // List what files exist in this user's directory
                const userDir = path.join(uploadsDir, ownerUid);
                if (fs.existsSync(userDir)) {
                    const files = fs.readdirSync(userDir);
                    // console.log("Files in user directory:", files);
                }
                else {
                    console.log("User directory doesn't exist");
                }
            }
        }
        // Fallback: search all directories for the file
        // console.log("Fallback: searching all directories for", imageName);
        if (fs.existsSync(uploadsDir)) {
            const allDirs = fs.readdirSync(uploadsDir);
            // console.log("Directories in uploads:", allDirs);
            for (const dir of allDirs) {
                const dirPath = path.join(uploadsDir, dir);
                if (fs.statSync(dirPath).isDirectory()) {
                    const filePath = path.join(dirPath, imageName);
                    if (fs.existsSync(filePath)) {
                        console.log("Found file at:", filePath);
                        return res.sendFile(filePath);
                    }
                }
            }
        }
        console.log("File not found anywhere!");
        return res.status(404).json({ error: "Image not found" });
    }
    catch (error) {
        console.error("Error downloading image:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});
// Endpoint to upload image
exports.Router.post("/images", verifyToken_1.verifyToken, upload.single("image"), async (req, res) => {
    try {
        // console.log("Image upload request received");
        // console.log("File:", req.file ? req.file.originalname : "NO FILE");
        // console.log("UID:", req.body.uid);
        if (!req.file) {
            console.log("Error: No file uploaded");
            return res.status(400).send("No file uploaded");
        }
        const uid = req.body.uid;
        if (!uid) {
            console.log("Error: UID missing from body");
            return res.status(400).json({ error: "UID is required in request body" });
        }
        console.log("File uploaded successfully to:", req.file.path);
        return res.status(200).json({ message: "File uploaded successfully", filename: req.file.originalname });
    }
    catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});
// Endpoint to delete image
exports.Router.delete("/images/:imageName", verifyToken_1.verifyToken, async (req, res) => {
    try {
        const imageName = req.params.imageName;
        const uid = req.body.uid;
        const imagePath = path.join(uploadsDir, uid, imageName);
        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({ error: "Image not found" });
        }
        // Delete the file
        fs.unlinkSync(imagePath);
        return res.status(200).send("File deleted successfully");
    }
    catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).send("Internal Server Error");
    }
});
// PROFILE PICTURES
// Endpoint to download profile picture
exports.Router.get("/profile_pictures/:profile_picture", async (req, res) => {
    try {
        const imageName = req.params.profile_picture;
        const imagePath = path.join(uploadsDir, "profile_pictures", imageName);
        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({ error: "Profile picture not found" });
        }
        res.sendFile(imagePath);
    }
    catch (error) {
        console.error("Error downloading profile picture:", error);
        res.status(500).send("Internal Server Error");
    }
});
// Endpoint to upload profile picture
exports.Router.post("/profile_pictures", verifyToken_1.verifyToken, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
        const uid = req.body.uid;
        console.log("Profile picture uploaded successfully");
        return res.status(200).send("File uploaded successfully");
    }
    catch (error) {
        console.error("Error uploading profile picture:", error);
        res.status(500).send("Internal Server Error");
    }
});
// Endpoint to delete profile picture
exports.Router.delete("/profile_pictures/:profile_picture", verifyToken_1.verifyToken, async (req, res) => {
    try {
        const imageName = req.params.profile_picture;
        const imagePath = path.join(uploadsDir, "profile_pictures", imageName);
        if (!fs.existsSync(imagePath)) {
            return res.status(404).json({ error: "Profile picture not found" });
        }
        fs.unlinkSync(imagePath);
        return res.status(200).send("File deleted successfully");
    }
    catch (error) {
        console.error("Error deleting profile picture:", error);
        res.status(500).send("Internal Server Error");
    }
});
// SOUNDS - MUSIC
// Endpoint to download music
exports.Router.get("/sounds/music/:musicName", async (req, res) => {
    try {
        const musicName = req.params.musicName;
        const musicPath = path.join(uploadsDir, "sounds", "music", musicName);
        if (!fs.existsSync(musicPath)) {
            return res.status(404).json({ error: "Music not found" });
        }
        res.sendFile(musicPath);
    }
    catch (error) {
        console.error("Error downloading music:", error);
        res.status(500).send("Internal Server Error");
    }
});
// Endpoint to upload music
exports.Router.post("/sounds/music", verifyToken_1.verifyToken, upload.single("music"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
        return res.status(200).send({
            musicName: req.file.originalname,
            message: "File uploaded successfully",
        });
    }
    catch (error) {
        console.error("Error uploading music:", error);
        res.status(500).send("Internal Server Error");
    }
});
// Endpoint to delete music
exports.Router.delete("/sounds/music/:musicName", verifyToken_1.verifyToken, async (req, res) => {
    try {
        const musicName = req.params.musicName;
        const musicPath = path.join(uploadsDir, "sounds", "music", musicName);
        if (!fs.existsSync(musicPath)) {
            return res.status(404).json({ error: "Music not found" });
        }
        fs.unlinkSync(musicPath);
        return res.status(200).send("File deleted successfully");
    }
    catch (error) {
        console.error("Error deleting music:", error);
        res.status(500).send("Internal Server Error");
    }
});
// SOUNDS - SOUND-FX
// Endpoint to download sound effect
exports.Router.get("/sounds/soundFx/:soundFxName", async (req, res) => {
    try {
        const soundFxName = req.params.soundFxName;
        const soundFxPath = path.join(uploadsDir, "sounds", "soundFx", soundFxName);
        if (!fs.existsSync(soundFxPath)) {
            return res.status(404).json({ error: "Sound effect not found" });
        }
        res.sendFile(soundFxPath);
    }
    catch (error) {
        console.error("Error downloading sound effect:", error);
        res.status(500).send("Internal Server Error");
    }
});
// Endpoint to upload sound effect
exports.Router.post("/sounds/soundFx", verifyToken_1.verifyToken, upload.single("soundFx"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }
        return res.status(200).send({
            soundFxName: req.file.originalname,
            message: "File uploaded successfully",
        });
    }
    catch (error) {
        console.error("Error uploading sound effect:", error);
        res.status(500).send("Internal Server Error");
    }
});
// Endpoint to delete sound effect
exports.Router.delete("/sounds/soundFx/:soundFxName", verifyToken_1.verifyToken, async (req, res) => {
    try {
        const soundFxName = req.params.soundFxName;
        const soundFxPath = path.join(uploadsDir, "sounds", "soundFx", soundFxName);
        if (!fs.existsSync(soundFxPath)) {
            return res.status(404).json({ error: "Sound effect not found" });
        }
        fs.unlinkSync(soundFxPath);
        return res.status(200).send("File deleted successfully");
    }
    catch (error) {
        console.error("Error deleting sound effect:", error);
        res.status(500).send("Internal Server Error");
    }
});
//# sourceMappingURL=storage.js.map