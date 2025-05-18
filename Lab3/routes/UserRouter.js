// const express = require("express");
// const User = require("../db/userModel");
// const router = express.Router();

// router.post("/", async (request, response) => {

// });

// router.get("/", async (request, response) => {

// });

// module.exports = router;
const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

// Tạo user mới
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Lấy tất cả user
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).exec();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
