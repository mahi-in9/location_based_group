const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      type: "Point",
      required: true,
      coordinates: [longitude, latitude],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
