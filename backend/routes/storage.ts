import express from "express";
import multer from "multer";
import * as fs from "fs";
import * as path from "path";
import { verifyToken } from "../middleware/verifyToken";

export const Router = express.Router();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    const uid = req.body.uid;
    const userDir = path.join(uploadsDir, uid || "anonymous");
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    cb(null, userDir);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// ALL FILES

// Endpoint to get list of all the files in storage
Router.get("/files", async (req, res) => {
  try {
    // Read all files from uploads directory
    const files = fs.readdirSync(uploadsDir);
    res.status(200).json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to get list of all the files by uid in storage
Router.get("/files/:uid", async (req, res) => {
  try {
    const uid = req.params.uid;
    const userDir = path.join(uploadsDir, uid);

    if (!fs.existsSync(userDir)) {
      return res.status(200).json([]);
    }

    const fileNames = fs.readdirSync(userDir);
    res.status(200).json(fileNames);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).send("Internal Server Error");
  }
});

// IMAGES

// Endpoint to download image
Router.get("/images/:imageName", async (req, res) => {
  try {
    const imageName = req.params.imageName;
    let ownerUid = req.query.ownerUid as string;

    console.log("=== GET /images/:imageName ===");
    console.log("imageName:", imageName);
    console.log("ownerUid:", ownerUid);
    console.log("uploadsDir:", uploadsDir);

    if (!imageName) {
      return res.status(400).json({ error: "Missing imageName" });
    }

    // If ownerUid is provided, try that path first
    if (ownerUid) {
      const imagePath = path.join(uploadsDir, ownerUid, imageName);
      console.log("Trying path:", imagePath);
      console.log("Path exists?", fs.existsSync(imagePath));

      if (fs.existsSync(imagePath)) {
        console.log("File found!");
        return res.sendFile(imagePath);
      } else {
        // List what files exist in this user's directory
        const userDir = path.join(uploadsDir, ownerUid);
        if (fs.existsSync(userDir)) {
          const files = fs.readdirSync(userDir);
          console.log("Files in user directory:", files);
        } else {
          console.log("User directory doesn't exist");
        }
      }
    }

    // Fallback: search all directories for the file
    console.log("Fallback: searching all directories for", imageName);
    if (fs.existsSync(uploadsDir)) {
      const allDirs = fs.readdirSync(uploadsDir);
      console.log("Directories in uploads:", allDirs);

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
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).json({ error: "Internal Server Error", details: (error as Error).message });
  }
});

// Endpoint to upload image
Router.post(
  "/images",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      console.log("Image upload request received");
      console.log("File:", req.file ? req.file.originalname : "NO FILE");
      console.log("UID:", req.body.uid);

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
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Internal Server Error", details: (error as Error).message });
    }
  }
);

// Endpoint to delete image
Router.delete("/images/:imageName", verifyToken, async (req, res) => {
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
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PROFILE PICTURES

// Endpoint to download profile picture
Router.get("/profile_pictures/:profile_picture", async (req, res) => {
  try {
    const imageName = req.params.profile_picture;
    const imagePath = path.join(uploadsDir, "profile_pictures", imageName);

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: "Profile picture not found" });
    }

    res.sendFile(imagePath);
  } catch (error) {
    console.error("Error downloading profile picture:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to upload profile picture
Router.post(
  "/profile_pictures",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded");
      }

      const uid = req.body.uid;

      console.log("Profile picture uploaded successfully");
      return res.status(200).send("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Endpoint to delete profile picture
Router.delete(
  "/profile_pictures/:profile_picture",
  verifyToken,
  async (req, res) => {
    try {
      const imageName = req.params.profile_picture;
      const imagePath = path.join(uploadsDir, "profile_pictures", imageName);

      if (!fs.existsSync(imagePath)) {
        return res.status(404).json({ error: "Profile picture not found" });
      }

      fs.unlinkSync(imagePath);

      return res.status(200).send("File deleted successfully");
    } catch (error) {
      console.error("Error deleting profile picture:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// SOUNDS - MUSIC

// Endpoint to download music
Router.get("/sounds/music/:musicName", async (req, res) => {
  try {
    const musicName = req.params.musicName;
    const musicPath = path.join(uploadsDir, "sounds", "music", musicName);

    if (!fs.existsSync(musicPath)) {
      return res.status(404).json({ error: "Music not found" });
    }

    res.sendFile(musicPath);
  } catch (error) {
    console.error("Error downloading music:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to upload music
Router.post(
  "/sounds/music",
  verifyToken,
  upload.single("music"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded");
      }

      return res.status(200).send({
        musicName: req.file.originalname,
        message: "File uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading music:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Endpoint to delete music
Router.delete("/sounds/music/:musicName", verifyToken, async (req, res) => {
  try {
    const musicName = req.params.musicName;
    const musicPath = path.join(uploadsDir, "sounds", "music", musicName);

    if (!fs.existsSync(musicPath)) {
      return res.status(404).json({ error: "Music not found" });
    }

    fs.unlinkSync(musicPath);

    return res.status(200).send("File deleted successfully");
  } catch (error) {
    console.error("Error deleting music:", error);
    res.status(500).send("Internal Server Error");
  }
});

// SOUNDS - SOUND-FX

// Endpoint to download sound effect
Router.get("/sounds/soundFx/:soundFxName", async (req, res) => {
  try {
    const soundFxName = req.params.soundFxName;
    const soundFxPath = path.join(uploadsDir, "sounds", "soundFx", soundFxName);

    if (!fs.existsSync(soundFxPath)) {
      return res.status(404).json({ error: "Sound effect not found" });
    }

    res.sendFile(soundFxPath);
  } catch (error) {
    console.error("Error downloading sound effect:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to upload sound effect
Router.post(
  "/sounds/soundFx",
  verifyToken,
  upload.single("soundFx"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send("No file uploaded");
      }

      return res.status(200).send({
        soundFxName: req.file.originalname,
        message: "File uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading sound effect:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Endpoint to delete sound effect
Router.delete("/sounds/soundFx/:soundFxName", verifyToken, async (req, res) => {
  try {
    const soundFxName = req.params.soundFxName;
    const soundFxPath = path.join(uploadsDir, "sounds", "soundFx", soundFxName);

    if (!fs.existsSync(soundFxPath)) {
      return res.status(404).json({ error: "Sound effect not found" });
    }

    fs.unlinkSync(soundFxPath);

    return res.status(200).send("File deleted successfully");
  } catch (error) {
    console.error("Error deleting sound effect:", error);
    res.status(500).send("Internal Server Error");
  }
});
