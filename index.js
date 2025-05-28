const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const { initializeDatabase } = require("./db/db.connect");
const Meetup = require("./models/meetup.model");
const Speaker = require("./models/Speaker.model");

initializeDatabase();

app.get("/", (req, res) => {
  res.status(200).json({ message: "This is meeetup home page." });
});

async function createEvent(newEvent) {
  try {
    const event = new Meetup(newEvent);
    const saveEvent = await event.save();
    return saveEvent;
  } catch (error) {
    console.error(error);
  }
}

app.post("/events", async (req, res) => {
  try {
    const savedEvent = await createEvent(req.body);
    if (savedEvent) {
      res
        .status(201)
        .json({ message: "Event added succussfully.", event: savedEvent });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

//-------------------------------------------------------------------

app.post("/meetups", async (req, res) => {
  try {
    const {
      title,
      typeOfEvent,
      thumbnail,
      details,
      tags,
      eventTiming,
      speakers, // Array of speaker objects
      hostedBy,
      capacity,
      contactEmail,
      eventPrice,
      eventVenue,
      eventAddress,
    } = req.body;

    // 1. Create speaker documents first
    const speakerDocs = await Promise.all(
      speakers.map(async (sp) => {
        // Optionally check if speaker exists to avoid duplicates
        return await Speaker.create(sp);
      })
    );

    // 2. Extract speaker _ids
    const speakerIds = speakerDocs.map((sp) => sp._id);

    // 3. Create meetup with speaker references
    const meetup = await Meetup.create({
      title,
      typeOfEvent,
      thumbnail,
      details,
      tags,
      eventTiming,
      speakers: speakerIds,
      hostedBy,
      capacity,
      contactEmail,
      eventPrice,
      eventVenue,
      eventAddress,
    });

    res.status(201).json({ message: "Meetup created", meetup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//-----------------------------------------------------------------------

async function readAllEvent() {
  try {
    const event = await Meetup.find();
    return event;
  } catch (error) {
    console.error(error);
  }
}

app.get("/events", async (req, res) => {
  try {
    const event = await readAllEvent();
    if (event.length != 0) {
      res.status(201).json(event);
    } else {
      res.status(404).json({ error: "No event found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

//read all event by Id

async function readAllEventById(eventId) {
  try {
    const event = await Meetup.findById(eventId);
    return event;
  } catch (error) {
    console.error(error);
  }
}

app.get("/events/:eventId", async (req, res) => {
  try {
    const event = await readAllEventById(req.params.eventId);
    if (event) {
      res.status(201).json(event);
    } else {
      res.status(404).json({ error: "No event found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

//read all evemt by title

async function readAllEventByTitle(eventTitle) {
  try {
    const event = await Meetup.findOne({ title: eventTitle });
    return event;
  } catch (error) {
    console.error(error);
  }
}

app.get("/events/title/:eventName", async (req, res) => {
  try {
    const event = await readAllEventByTitle(req.params.eventName);
    if (event) {
      res.status(201).json(event);
    } else {
      res.status(404).json({ error: "No event found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

// read by tags

async function readAllEventByTags(eventTag) {
  try {
    const event = await Meetup.find({ tags: eventTag });
    return event;
  } catch (error) {
    console.error(error);
  }
}

app.get("/events/tag/:eventTag", async (req, res) => {
  try {
    const event = await readAllEventByTags(req.params.eventTag);
    if (event.length != 0) {
      res.status(201).json(event);
    } else {
      res.status(404).json({ error: "No event found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

// read by type

async function readAllEventByType(eventType) {
  try {
    const event = await Meetup.find({ typeOfEvent: eventType });
    return event;
  } catch (error) {
    console.error(error);
  }
}

app.get("/events/type/:eventTyoe", async (req, res) => {
  try {
    const event = await readAllEventByType(req.params.eventTyoe);
    if (event.length != 0) {
      res.status(201).json(event);
    } else {
      res.status(404).json({ error: "No event found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
