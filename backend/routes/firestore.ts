import express from "express";
import { firestore } from "../db/firebaseAdmin";
import { verifyToken } from "../middleware/verifyToken";

export const Router = express.Router();

interface Calendar {
  calendarId: string;
  calendarName: string;
  windows: string[];
  text: {
    title: string;
    titleFont: string;
    titleFontSize: number;
    titleColor: string;
    subtitle: string;
    subtitleFont: string;
    subTitleFontSize: number;
    subtitleColor: string;
  };
  sounds: {
    musicName: string;
    soundFxName: string;
  };
  image: {
    imageUrl: string;
    uploadedImageName: string;
  };
  windowsContent: string[];
  // Add more properties as needed
}

// get all calendars in the database
Router.get("/calendars", async (req, res) => {
  async function getAllCalendarData() {
    const allCalendarsRef = firestore.collection("all calendars");
    const snapshot = await allCalendarsRef.get();

    const calendarDataArray: any[] = [];
    const promises: any[] = [];
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
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error getting calendar data:", error);
    res.status(500).send("Error getting calendar data");
  }
});

// get a calendar
Router.get("/calendars/:id", async (req, res) => {
  const calendarId = req.params.id;
  const uid = req.query.uid as string;

  try {
    const doc = await firestore
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
    const calendar: Calendar = {
      calendarId: doc.id,
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
  } catch (error) {
    console.error("Error fetching calendar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// add a new calendar
Router.post("/calendars", verifyToken, async (req, res) => {
  const calendar: Calendar = req.body.data;

  // Access UID data
  const uid = req.body.uid;

  // Create a reference to the 'calendars' collection
  const calendarsCollectionRef = firestore.collection("all calendars");

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
  } catch (error) {
    console.error("Error creating calendar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update a calendar
Router.put("/calendars/:id", async (req, res) => {
  const id = req.params.id;
  const updatedCalendar: Calendar = req.body;
  try {
    await firestore
      .collection("calendars")
      .doc(id)
      .set(updatedCalendar, { merge: true });
    res.status(200).json({ message: "Calendar updated successfully" });
  } catch (error) {
    console.error("Error updating calendar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete a calendar
Router.delete("/calendars/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await firestore.collection("calendars").doc(id).delete();
    res.status(200).json({ message: "Calendar deleted successfully" });
  } catch (error) {
    console.error("Error deleting calendar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
