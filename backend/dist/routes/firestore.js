"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = __importDefault(require("express"));
const firebaseAdmin_1 = require("../db/firebaseAdmin");
const verifyToken_1 = require("../middleware/verifyToken");
exports.Router = express_1.default.Router();
// get all calendars
exports.Router.get("/calendars", async (req, res) => {
    try {
        const snapshot = await firebaseAdmin_1.firestore.collection("all calendars").get();
        const calendars = [];
        snapshot.forEach((doc) => {
            const calendarData = doc.data();
            const calendar = {
                calendarId: doc.id,
                windows: calendarData.windows,
                text: {
                    title: calendarData.title,
                    titleFont: calendarData.titleFont,
                    titleFontSize: calendarData.titleFontSize,
                    titleColor: calendarData.titleColor,
                    subtitle: calendarData.subtitle,
                    subtitleFont: calendarData.subtitleFont,
                    subTitleFontSize: calendarData.subTitleFontSize,
                    subtitleColor: calendarData.subtitleColor,
                },
                image: {
                    imageUrl: calendarData.imageUrl,
                    uploadedImageName: calendarData.uploadedImageName,
                },
                sounds: {
                    musicName: calendarData.musicName,
                    soundFxName: calendarData.soundFxName,
                },
                windowsContent: calendarData.windowsContent,
                // Map other properties from the document as needed
            };
            calendars.push(calendar);
        });
        res.status(200).json(calendars);
    }
    catch (error) {
        console.error("Error fetching calendars:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
// get a calendar
exports.Router.get("/calendars/:id", async (req, res) => {
    const calendarId = req.params.id;
    const uid = req.query.uid;
    try {
        const doc = await firebaseAdmin_1.firestore
            .collection("all calendars")
            .doc(uid)
            .collection("user calendars")
            .doc(calendarId)
            .get();
        if (!doc.exists) {
            res.status(404).json({ error: "Calendar not found" });
            return;
        }
        const calendarData = doc.data();
        const calendar = {
            calendarId: doc.id,
            windows: calendarData.windows,
            text: {
                title: calendarData.text.title,
                titleFont: calendarData.text.titleFont,
                titleFontSize: calendarData.text.titleFontSize,
                titleColor: calendarData.text.titleColor,
                subtitle: calendarData.text.subtitle,
                subtitleFont: calendarData.text.subtitleFont,
                subTitleFontSize: calendarData.text.subTitleFontSize,
                subtitleColor: calendarData.text.subtitleColor,
            },
            image: {
                imageUrl: calendarData.image.imageUrl,
                uploadedImageName: calendarData.image.uploadedImageName,
            },
            sounds: {
                musicName: calendarData.sounds.musicName,
                soundFxName: calendarData.sounds.soundFxName,
            },
            windowsContent: calendarData.windowsContent,
            // Map other properties from the document as needed
        };
        res.status(200).json(calendar);
    }
    catch (error) {
        console.error("Error fetching calendar:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
// add a new calendar
exports.Router.post("/calendars", verifyToken_1.verifyToken, async (req, res) => {
    const calendar = req.body.data;
    // Access UID data
    const uid = req.body.uid;
    // Create a reference to the 'calendars' collection
    const calendarsCollectionRef = firebaseAdmin_1.firestore.collection("all calendars");
    // Create a reference to the 'uid' folder inside 'calendars'
    const userCalendarFolderRef = calendarsCollectionRef.doc(uid);
    // Check if the 'uid' folder exists
    const folderSnapshot = await userCalendarFolderRef.get();
    if (!folderSnapshot.exists) {
        // If 'uid' folder doesn't exist, create it
        await userCalendarFolderRef.set({});
    }
    try {
        const docRef = await userCalendarFolderRef
            .collection("user calendars")
            .add(calendar);
        res.status(201).json({
            message: "Calendar added successfully",
            calendarId: docRef.id,
        });
    }
    catch (error) {
        console.error("Error creating calendar:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
// update a calendar
exports.Router.put("/calendars/:id", async (req, res) => {
    const id = req.params.id;
    const updatedCalendar = req.body;
    try {
        await firebaseAdmin_1.firestore
            .collection("calendars")
            .doc(id)
            .set(updatedCalendar, { merge: true });
        res.status(200).json({ message: "Calendar updated successfully" });
    }
    catch (error) {
        console.error("Error updating calendar:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
// delete a calendar
exports.Router.delete("/calendars/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await firebaseAdmin_1.firestore.collection("calendars").doc(id).delete();
        res.status(200).json({ message: "Calendar deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting calendar:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
//# sourceMappingURL=firestore.js.map