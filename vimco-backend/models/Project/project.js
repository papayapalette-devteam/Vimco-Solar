const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    capacity: {
      type: String,
    },
    completed_date: {
      type: Date,
    },
    description: {
      type: String,
    },
    client_name: {
      type: String,
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
