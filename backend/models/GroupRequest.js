// models/groupRequest.model.js
const mongoose = require("mongoose");

const groupRequestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("GroupRequest", groupRequestSchema);
