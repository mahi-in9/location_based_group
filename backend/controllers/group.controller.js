const Group = require("../models/Group");
const mongoose = require("mongoose");
const Member = require("../models/Membership");

/**
 * CREATE GROUP
 */
const createGroup = async (req, res) => {
  try {
    const { name, description, location, radius, isPrivate } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const group = await Group.create({
      name,
      description,
      location,
      createdBy: req.user.id,
      radius: radius || 5000,
      isPrivate: isPrivate || false,
    });

    return res.status(201).json({
      message: "Group created successfully",
      data: group,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET NEARBY GROUPS (within radius)
 */
const getNearbyGroups = async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({ message: "Coordinates required" });
    }

    const groups = await Group.find({ location }).populate(
      "createdBy",
      "name email",
    );

    return res.status(200).json({
      message: "Nearby groups fetched",
      count: groups.length,
      data: groups,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * GET GROUP BY ID
 */
const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate(
      "createdBy",
      "name email",
    );

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    return res.status(200).json(group);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * JOIN GROUP
 */
const joinGroup = async (req, res) => {
  try {
    const { groupId } = req.body;
    const userId = req.user.id;

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if already joined
    const existing = await Member.findOne({ group: groupId, user: userId });
    if (existing) {
      return res.status(400).json({ message: "Already joined" });
    }

    const member = await Member.create({
      group: groupId,
      user: userId,
    });

    return res.status(200).json({
      message: "Joined group successfully",
      data: member,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * LEAVE GROUP
 */
const leaveGroup = async (req, res) => {
  try {
    const { groupId } = req.body;
    const userId = req.user.id;

    const membership = await Member.findOneAndDelete({
      group: groupId,
      user: userId,
    });

    if (!membership) {
      return res.status(404).json({ message: "Not a member" });
    }

    return res.status(200).json({
      message: "Left group successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * DELETE GROUP (only creator)
 */
const deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.id;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Group.findByIdAndDelete(groupId);
    await Member.deleteMany({ group: groupId });

    return res.status(200).json({
      message: "Group deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createGroup,
  // getAllGroups,
  getGroupById,
  getNearbyGroups,
  deleteGroup,
};
