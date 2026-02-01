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
    // Use temp directory first, we'll move the file after validation
    cb(null, uploadsDir);
  },
  filename: (req: any, file: any, cb: any) => {
    // Use a temporary filename with timestamp to avoid conflicts
    const tempFilename = `temp_${Date.now()}_${file.originalname}`;
    cb(null, tempFilename);
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
      } else {
        // List what files exist in this user's directory
        const userDir = path.join(uploadsDir, ownerUid);
        if (fs.existsSync(userDir)) {
          const files = fs.readdirSync(userDir);
          // console.log("Files in user directory:", files);
        } else {
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
        return res.status(400).json({ error: "No file uploaded" });
      }

      const uid = req.body.uid;
      if (!uid || uid.trim() === "") {
        console.log("Error: UID missing or empty from body");
        // Delete the temp file
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({ error: "UID is required in request body and cannot be empty" });
      }

      // Create user directory if it doesn't exist
      const userDir = path.join(uploadsDir, uid);
      if (!fs.existsSync(userDir)) {
        fs.mkdirSync(userDir, { recursive: true });
      }

      // Move file from temp location to user directory with original name
      const originalFilename = req.file.originalname;
      const finalPath = path.join(userDir, originalFilename);
      
      // If file exists, delete it first
      if (fs.existsSync(finalPath)) {
        fs.unlinkSync(finalPath);
      }
      
      fs.renameSync(req.file.path, finalPath);

      console.log("File uploaded successfully to:", finalPath);
      return res.status(200).json({ message: "File uploaded successfully", filename: originalFilename });
    } catch (error) {
      console.error("Error uploading file:", error);
      // Clean up temp file if it exists
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
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
    const uid = req.query.uid as string;

    // If UID is provided, try user directory first
    if (uid) {
      const imagePath = path.join(uploadsDir, uid, "profile_pictures", imageName);
      if (fs.existsSync(imagePath)) {
        return res.sendFile(imagePath);
      }
    }

    // Fallback: search all user directories
    if (fs.existsSync(uploadsDir)) {
      const allDirs = fs.readdirSync(uploadsDir);
      for (const dir of allDirs) {
        const dirPath = path.join(uploadsDir, dir, "profile_pictures", imageName);
        if (fs.existsSync(dirPath)) {
          return res.sendFile(dirPath);
        }
      }
    }

    return res.status(404).json({ error: "Profile picture not found" });
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
      console.log("Profile picture upload request received");
      console.log("File:", req.file ? req.file.originalname : "NO FILE");
      console.log("UID:", req.body.uid);

      if (!req.file) {
        console.log("Error: No file uploaded");
        return res.status(400).json({ error: "No file uploaded" });
      }

      const uid = req.body.uid;
      if (!uid || uid.trim() === "") {
        console.log("Error: UID missing or empty from body");
        // Delete the temp file
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({ error: "UID is required in request body and cannot be empty" });
      }

      // Create user profile pictures directory if it doesn't exist
      const profilePicsDir = path.join(uploadsDir, uid, "profile_pictures");
      if (!fs.existsSync(profilePicsDir)) {
        fs.mkdirSync(profilePicsDir, { recursive: true });
      }

      // Delete old profile picture if it exists
      const oldFiles = fs.readdirSync(profilePicsDir);
      for (const file of oldFiles) {
        const filePath = path.join(profilePicsDir, file);
        fs.unlinkSync(filePath);
      }

      // Move file from temp location to profile pictures directory
      const originalFilename = req.file.originalname;
      const finalPath = path.join(profilePicsDir, originalFilename);
      
      fs.renameSync(req.file.path, finalPath);

      console.log("Profile picture uploaded successfully to:", finalPath);
      return res.status(200).json({ message: "File uploaded successfully", filename: originalFilename });
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      // Clean up temp file if it exists
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      res.status(500).json({ error: "Internal Server Error", details: (error as Error).message });
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
      const uid = req.body.uid;

      if (!uid || uid.trim() === "") {
        return res.status(400).json({ error: "UID is required in request body" });
      }

      const candidatePaths = [
        path.join(uploadsDir, uid, "profile_pictures", imageName),
        path.join(uploadsDir, uid, imageName),
        path.join(uploadsDir, "anonymous", "profile_pictures", imageName),
        path.join(uploadsDir, "anonymous", imageName),
        path.join(uploadsDir, "profile_pictures", imageName),
      ];

      const imagePath = candidatePaths.find((candidate) => fs.existsSync(candidate));

      if (!imagePath) {
        console.log("Profile picture not found at any known path. Tried:", candidatePaths);
        return res.status(404).json({ error: "Profile picture not found" });
      }

      fs.unlinkSync(imagePath);
      console.log("Profile picture deleted successfully:", imagePath);

      return res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
      console.error("Error deleting profile picture:", error);
      res.status(500).json({ error: "Internal Server Error", details: (error as Error).message });
    }
  }
);

// SOUNDS - MUSIC

// Endpoint to download music
Router.get("/sounds/music/:musicName", async (req, res) => {
  try {
    const musicName = req.params.musicName;
    const uid = req.query.uid as string;

    // If UID is provided, try user directory first
    if (uid) {
      const musicPath = path.join(uploadsDir, uid, "sounds", "music", musicName);
      if (fs.existsSync(musicPath)) {
        return res.sendFile(musicPath);
      }
    }

    // Fallback: search all user directories
    if (fs.existsSync(uploadsDir)) {
      const allDirs = fs.readdirSync(uploadsDir);
      for (const dir of allDirs) {
        const musicPath = path.join(uploadsDir, dir, "sounds", "music", musicName);
        if (fs.existsSync(musicPath)) {
          return res.sendFile(musicPath);
        }
      }
    }

    return res.status(404).json({ error: "Music not found" });
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

      const uid = req.body.uid;
      if (!uid || uid.trim() === "") {
        // Delete the temp file
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({ error: "UID is required in request body" });
      }

      // Create user music directory if it doesn't exist
      const musicDir = path.join(uploadsDir, uid, "sounds", "music");
      if (!fs.existsSync(musicDir)) {
        fs.mkdirSync(musicDir, { recursive: true });
      }

      // Move file from temp location to music directory
      const originalFilename = req.file.originalname;
      const finalPath = path.join(musicDir, originalFilename);
      
      fs.renameSync(req.file.path, finalPath);

      console.log("Music uploaded successfully to:", finalPath);
      return res.status(200).send({
        musicName: originalFilename,
        message: "File uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading music:", error);
      // Clean up temp file if it exists
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
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
    const uid = req.query.uid as string;

    // If UID is provided, try user directory first
    if (uid) {
      const soundFxPath = path.join(uploadsDir, uid, "sounds", "soundFx", soundFxName);
      if (fs.existsSync(soundFxPath)) {
        return res.sendFile(soundFxPath);
      }
    }

    // Fallback: search all user directories
    if (fs.existsSync(uploadsDir)) {
      const allDirs = fs.readdirSync(uploadsDir);
      for (const dir of allDirs) {
        const soundFxPath = path.join(uploadsDir, dir, "sounds", "soundFx", soundFxName);
        if (fs.existsSync(soundFxPath)) {
          return res.sendFile(soundFxPath);
        }
      }
    }

    return res.status(404).json({ error: "Sound effect not found" });
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

      const uid = req.body.uid;
      if (!uid || uid.trim() === "") {
        // Delete the temp file
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res.status(400).json({ error: "UID is required in request body" });
      }

      // Create user soundFx directory if it doesn't exist
      const soundFxDir = path.join(uploadsDir, uid, "sounds", "soundFx");
      if (!fs.existsSync(soundFxDir)) {
        fs.mkdirSync(soundFxDir, { recursive: true });
      }

      // Move file from temp location to soundFx directory
      const originalFilename = req.file.originalname;
      const finalPath = path.join(soundFxDir, originalFilename);
      
      fs.renameSync(req.file.path, finalPath);

      console.log("Sound effect uploaded successfully to:", finalPath);
      return res.status(200).send({
        soundFxName: originalFilename,
        message: "File uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading sound effect:", error);
      // Clean up temp file if it exists
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
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
