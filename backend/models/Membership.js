// models/membership.model.js
const mongoose = require("mongoose");

const membershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },

    role: {
      type: String,
      enum: ["member", "admin", "owner"],
      default: "member",
    },
  },
  { timestamps: true },
);

// prevent duplicate joins
membershipSchema.index({ userId: 1, groupId: 1 }, { unique: true });

module.exports = mongoose.model("Membership", membershipSchema);
