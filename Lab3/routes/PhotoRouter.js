// const express = require("express");
// const Photo = require("../db/photoModel");
// const router = express.Router();

// router.post("/", async (request, response) => {

// });

// router.get("/", async (request, response) => {

// });

// module.exports = router;

const express = require("express");
const Photo = require("../db/photoModel");
const router = express.Router();

// Tạo photo mới
router.post("/", async (req, res) => {
  try {
    const { title, url, description } = req.body;

    // Kiểm tra dữ liệu bắt buộc
    if (!title || !url) {
      return res
        .status(400)
        .json({ error: "Missing required fields: title or url" });
    }

    const newPhoto = new Photo({
      title,
      url,
      description,
    });

    const savedPhoto = await newPhoto.save();

    res.status(201).json(savedPhoto);
  } catch (error) {
    console.error("Error creating photo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Lấy tất cả photos
router.get("/", async (req, res) => {
  try {
    const photos = await Photo.find({}).exec();
    res.json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
