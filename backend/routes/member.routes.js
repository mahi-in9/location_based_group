const express = require("express");
const router = express.Router();

const {
  joinGroup,
  leaveGroup,
  getGroupMembers,
  getUserGroups,
} = require("../controllers/member.controller");

const authMiddleware = require("../middlewares/auth.middleware");

// JOIN / LEAVE
router.post("/join", authMiddleware(), joinGroup);
router.post("/leave", authMiddleware(), leaveGroup);

// GET MEMBERS OF GROUP
router.get("/group/:groupId", getGroupMembers);

// GET USER GROUPS
router.get("/user/me", authMiddleware(), getUserGroups);

module.exports = router;
