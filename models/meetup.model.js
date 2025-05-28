const mongoose = require("mongoose");

const MeetupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    typeOfEvent: {
      type: String,
      required: true,
      enum: ["Online", "Offline", "Both"],
    },
    thumbnail: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
    eventTiming: {
      type: String,
      required: true,
    },
    // speakers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Speaker" }],
    speakers: {
      type: [
        {
          name: { type: String, required: true },
          role: {
            type: String,
            required: true,
          },
          imageUrl: {
            type: String,
            default: "", // Optional image URL
          },
        },
      ],
      required: true,
    },
    hostedBy: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      default: 100,
    },
    contactEmail: {
      type: String,
    },
    eventPrice: {
      type: Number,
      required: true,
    },
    eventVenue: {
      type: String,
      required: true,
    },
    eventAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Meetup = mongoose.model("Meetup", MeetupSchema);
module.exports = Meetup;
