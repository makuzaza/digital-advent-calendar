import express from "express";
import multer from "multer";

import { bucket } from "../db/firebaseAdmin";

export const Router = express.Router();

const upload = multer({ dest: "uploads/" }); // Define multer storage destination

// ALL FILES

// Endpoint to get list of all the files in storage
Router.get("/files", async (req, res) => {
  try {
    // Access all files in the bucket
    const [files] = await bucket.getFiles();

    // Extract file names
    const fileNames = files.map((file) => file.name);

    // Send file names in response
    res.status(200).json(fileNames);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).send("Internal Server Error");
  }
});

// IMAGES

// Endpoint to download image
Router.get("/images/:imageName", async (req, res) => {
  try {
    const imageName = req.params.imageName;

    // Specify the full path to the image within the 'images' folder
    const imagePath = "images/" + imageName;

    // Access file from the bucket
    const file = bucket.file(imagePath);

    // Download file as buffer
    const fileBuffer = await file.download();

    // Set response content type
    res.contentType("image/jpeg"); // Adjust content type based on your image type

    // Send image buffer in response
    res.send(fileBuffer[0]);
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to upload image
Router.post("/images", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // Get file path
    const filePath = req.file.path;

    // Upload file to Firebase Storage
    await bucket.upload(filePath, {
      destination: "images/" + req.file.originalname, // Define destination path in Firebase Storage
    });

    return res.status(200).send("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to delete image
Router.delete("/images/:imageName", async (req, res) => {
  try {
    const imageName = req.params.imageName;

    // Specify the full path to the image within the 'images' folder
    const imagePath = "images/" + imageName;

    // Access file from the bucket
    const file = bucket.file(imagePath);

    // Delete the file
    await file.delete();

    return res.status(200).send("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// SOUNDS - MUSIC

// Endpoint to download music
Router.get("/sounds/music/:musicName", async (req, res) => {
  try {
    const musicName = req.params.musicName;

    // Specify the full path to the sound within the 'sounds' folder
    const musicPath = "sounds/music/" + musicName;

    // Access file from the bucket
    const file = bucket.file(musicPath);

    // Download file as buffer
    const fileBuffer = await file.download();

    // Set response content type
    res.contentType("audio/mpeg"); // Adjust content type based on your sound type

    // Send sound buffer in response
    res.send(fileBuffer[0]);
  } catch (error) {
    console.error("Error downloading sound:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to upload music
Router.post("/sounds/music", upload.single("music"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // Get file path
    const filePath = req.file.path;

    // Upload file to Firebase Storage
    await bucket.upload(filePath, {
      destination: "sounds/music/" + req.file.originalname, // Define destination path in Firebase Storage
    });

    return res.status(200).send("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to delete music
Router.delete("/sounds/music/:musicName", async (req, res) => {
  try {
    const musicName = req.params.musicName;

    // Specify the full path to the sound within the 'sounds' folder
    const musicPath = "sounds/music/" + musicName;

    // Access file from the bucket
    const file = bucket.file(musicPath);

    // Delete the file
    await file.delete();

    return res.status(200).send("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// SOUNDS - SOUND-FX

// Endpoint to download sound effect
Router.get("/sounds/soundFx/:soundFxName", async (req, res) => {
  try {
    const soundFxName = req.params.soundFxName;

    // Specify the full path to the sound within the 'sounds' folder
    const soundFxPath = "sounds/soundFx/" + soundFxName;

    // Access file from the bucket
    const file = bucket.file(soundFxPath);

    // Download file as buffer
    const fileBuffer = await file.download();

    // Set response content type
    res.contentType("audio/mpeg"); // Adjust content type based on your sound type

    // Send sound buffer in response
    res.send(fileBuffer[0]);
  } catch (error) {
    console.error("Error downloading sound:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to upload sound effect
Router.post("/sounds/soundFx", upload.single("soundFx"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    // Get file path
    const filePath = req.file.path;

    // Upload file to Firebase Storage
    await bucket.upload(filePath, {
      destination: "sounds/soundFx/" + req.file.originalname, // Define destination path in Firebase Storage
    });

    return res.status(200).send("File uploaded successfully");
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to delete sound effect
Router.delete("/sounds/soundFx/:soundFxName", async (req, res) => {
  try {
    const soundFxName = req.params.soundFxName;

    // Specify the full path to the sound within the 'sounds' folder
    const soundFxPath = "sounds/soundFx/" + soundFxName;

    // Access file from the bucket
    const file = bucket.file(soundFxPath);

    // Delete the file
    await file.delete();

    return res.status(200).send("File deleted successfully");
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).send("Internal Server Error");
  }
});
