const {
  createUser,
  loginUser,
  getAllUsers,
  getUserById,
} = require("../controllers/user.controller");

const express = require("express");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/all-users", getAllUsers);
router.get("/me", getUserById);

module.exports = router;
