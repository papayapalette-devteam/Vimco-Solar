const mongoose = require("mongoose");

const logoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    logo_url: {
      type: String,
      default: null,
    },
    text_logo: {
      type: String,
      default: null,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    display_order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Logo", logoSchema);
