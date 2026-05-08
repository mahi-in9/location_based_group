const Member = require("../models/Membership");
const Group = require("../models/Group");

// JOIN GROUP
const joinGroup = async (req, res) => {
  try {
    const { groupId } = req.body;
    const userId = req.user?.id || req.body.userId; // fallback for assignment

    // Check if group exists
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Prevent duplicate join
    const existing = await Member.findOne({ userId, groupId });
    if (existing) {
      return res.status(400).json({ message: "Already joined this group" });
    }

    const member = await Member.create({
      userId,
      groupId,
    });

    res.status(201).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LEAVE GROUP
const leaveGroup = async (req, res) => {
  try {
    const { groupId } = req.body;
    const userId = req.user?.id || req.body.userId;

    const member = await Member.findOneAndDelete({ userId, groupId });

    if (!member) {
      return res.status(404).json({ message: "Not a member of this group" });
    }

    res.status(200).json({
      success: true,
      message: "Left group successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET MEMBERS OF A GROUP
const getGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;

    const members = await Member.find({ groupId }).populate(
      "userId",
      "username location",
    );

    res.status(200).json({
      success: true,
      count: members.length,
      data: members,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET GROUPS OF A USER
const getUserGroups = async (req, res) => {
  try {
    const userId = req.user?.id || req.params.userId;

    const memberships = await Member.find({ userId }).populate("groupId");

    res.status(200).json({
      success: true,
      count: memberships.length,
      data: memberships,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  joinGroup,
  leaveGroup,
  getGroupMembers,
  getUserGroups,
};
