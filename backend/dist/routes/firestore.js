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
// get all calendars in the database
exports.Router.get("/calendars", async (req, res) => {
    async function getAllCalendarData() {
        const allCalendarsRef = firebaseAdmin_1.firestore.collection("all calendars");
        const snapshot = await allCalendarsRef.get();
        const calendarDataArray = [];
        const promises = [];
        snapshot.forEach((uidDoc) => {
            const userCalendarsRef = uidDoc.ref.collection("user calendars");
            const promise = userCalendarsRef.get().then((calendarSnapshot) => {
                calendarSnapshot.forEach((calendarDoc) => {
                    const calendarId = calendarDoc.id;
                    const data = calendarDoc.data();
                    calendarDataArray.push({ calendarId, data });
                });
            });
            promises.push(promise);
        });
        await Promise.all(promises); // Wait for all promises to resolve
        return calendarDataArray;
    }
    try {
        const data = await getAllCalendarData();
        res.status(200).json(data);
    }
    catch (error) {
        console.error("Error getting calendar data:", error);
        res.status(500).send("Error getting calendar data");
    }
});
// get all calendars for a specific user
exports.Router.get("/calendars/user", async (req, res) => {
    const uid = req.query.uid;
    async function getUserCalendarData() {
        const userCalendarsRef = firebaseAdmin_1.firestore
            .collection("all calendars")
            .doc(uid)
            .collection("user calendars");
        const snapshot = await userCalendarsRef.get();
        const calendarDataArray = [];
        snapshot.forEach((doc) => {
            const calendarId = doc.id;
            const data = doc.data();
            calendarDataArray.push({ calendarId, data });
        });
        return calendarDataArray;
    }
    try {
        const data = await getUserCalendarData();
        res.status(200).json(data);
    }
    catch (error) {
        console.error("Error getting user calendar data:", error);
        res.status(500).send("Error getting user calendar data");
    }
});
// get any user's calendar by id
exports.Router.get("/calendars/:id", async (req, res) => {
    const calendarId = req.params.id;
    try {
        // Query all user folders under "all calendars"
        const allCalendarsSnapshot = await firebaseAdmin_1.firestore
            .collection("all calendars")
            .get();
        // Iterate over each user folder
        for (const userDoc of allCalendarsSnapshot.docs) {
            const userUid = userDoc.id;
            // Try to retrieve the calendar from the current user folder
            const calendarDoc = await firebaseAdmin_1.firestore
                .collection("all calendars")
                .doc(userUid)
                .collection("user calendars")
                .doc(calendarId)
                .get();
            // If the calendar exists in the current user folder, return it
            if (calendarDoc.exists) {
                const calendarData = calendarDoc.data();
                const calendar = {
                    calendarId: calendarDoc.id,
                    ownerUid: calendarData.ownerUid,
                    calendarName: calendarData.title,
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
                        imageURL: calendarData.image.imageURL,
                        uploadedImageName: calendarData.image.uploadedImageName,
                    },
                    sounds: {
                        musicName: calendarData.sounds.musicName,
                        soundFxName: calendarData.sounds.soundFxName,
                    },
                    windowsContent: calendarData.windowContent.map((window) => ({
                        text: window.text,
                        videoURL: window.videoURL,
                        uploadedImageName: window.uploadedImageName,
                    })),
                    // Map other properties from the document as needed
                };
                return res.status(200).json(calendar);
            }
        }
        // If calendar is not found in any user folder, return 404
        res.status(404).json({ error: "Calendar not found" });
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
exports.Router.put("/calendars/:id", verifyToken_1.verifyToken, async (req, res) => {
    res.status(200).json({ error: "Server missing logic for this endpoint" });
});
// delete a calendar
exports.Router.delete("/calendars/:id", verifyToken_1.verifyToken, async (req, res) => {
    const id = req.params.id;
    const uid = req.query.uid;
    try {
        await firebaseAdmin_1.firestore
            .collection("all calendars")
            .doc(uid)
            .collection("user calendars")
            .doc(id)
            .delete();
        res.status(200).json({ message: "Calendar deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting calendar:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
});
//# sourceMappingURL=firestore.js.map