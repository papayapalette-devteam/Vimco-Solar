const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: String,
      required: true,
    },
    completed_date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    client_name: {
      type: String,
      required: true,
      trim: true,
    },
    project_type: {
      type: String,
      enum: ["residential", "commercial", "industrial"],
      default: "residential",
    },
    images: [
      {
        type: String, // store image URLs
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
