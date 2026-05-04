const {
  createGroup,
  //   getAllGroups,
  getGroupById,
  getNearbyGroups,
  deleteGroup,
} = require("../controllers/group.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const express = require("express");

const router = express.Router();

router.use(authMiddleware());

router.post("/", createGroup);
// router.get("/", getAllGroups);
router.get("/:id", getGroupById);
router.post("/nearby", getNearbyGroups);
router.delete("/:id", deleteGroup);

module.exports = router;
