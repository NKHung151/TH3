// const express = require("express");
// const Photo = require("../db/photoModel");
// const router = express.Router();

// router.post("/", async (request, response) => {

// });

// router.get("/", async (request, response) => {

// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Photo = require("../db/photoModel");
const User = require("../db/userModel");

//GET: Lấy toàn bộ thông tin về ảnh
router.get("/", async (req, res) => {
  try {
    const photos = await Photo.find({}).exec();
    res.json(photos);
  } catch (err) {
    console.error("Error fetching photos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// routes/photo.js hoặc trong user routes
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  try {
    const photos = await Photo.find({ user_id: user_id }).exec();

    if (!photos || photos.length === 0) {
      return res.status(404).json({ message: "No photos found for this user" });
    }

    res.json(photos);
  } catch (error) {
    console.error("Error fetching photos by user ID:", error);
    res.status(500).json({ message: "Server error" });
  }
});



// POST: Thêm comment mới vào 1 photo
router.post("/:photoId/comments", async (req, res) => {
  const { comment, userId } = req.body;
  if (!comment || !userId)
    return res.status(400).send("Missing comment or userId");

  try {
    const photo = await Photo.findById(req.params.photoId);
    if (!photo) return res.status(404).send("Photo not found.");

    photo.comments.push({
      comment,
      user_id: userId,
      date_time: new Date(),
    });

    await photo.save();
    res.status(201).send("Comment added successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
