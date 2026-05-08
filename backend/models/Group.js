const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    radius: {
      type: Number,
      default: 5000, // meters (5km)
    },

    isPrivate: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    locationName: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

groupSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Group", groupSchema);
