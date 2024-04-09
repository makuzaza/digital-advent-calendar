import express from "express";
import { firestore } from "../db/firebaseAdmin";

export const caasRouter = express.Router();

interface Calendar {
  id: string;
  name: string;
  // Add more properties as needed
}

// get all calendars
caasRouter.get("/calendars", async (req, res) => {
  try {
    const snapshot = await firestore.collection("calendars").get();
    const calendars: Calendar[] = [];
    snapshot.forEach((doc) => {
      const calendarData = doc.data();
      const calendar: Calendar = {
        id: doc.id,
        name: calendarData.name,
        // Map other properties from the document as needed
      };
      calendars.push(calendar);
    });
    res.status(200).json(calendars);
  } catch (error) {
    console.error("Error fetching calendars:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get a calendar
caasRouter.get("/calendars/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const doc = await firestore.collection("calendars").doc(id).get();
    if (!doc.exists) {
      res.status(404).json({ error: "Calendar not found" });
      return;
    }
    const calendarData = doc.data();
    const calendar: Calendar = {
      id: doc.id,
      name: calendarData.name,
      // Map other properties from the document as needed
    };
    res.status(200).json(calendar);
  } catch (error) {
    console.error("Error fetching calendar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// add a new calendar
caasRouter.post("/calendars", async (req, res) => {
  const calendar: Calendar = req.body;
  try {
    const docRef = await firestore.collection("calendars").add(calendar);
    res
      .status(201)
      .json({ message: "Calendar added successfully", id: docRef.id });
  } catch (error) {
    console.error("Error creating calendar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update a calendar
caasRouter.put("/calendars/:id", async (req, res) => {
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
caasRouter.delete("/calendars/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await firestore.collection("calendars").doc(id).delete();
    res.status(200).json({ message: "Calendar deleted successfully" });
  } catch (error) {
    console.error("Error deleting calendar:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
