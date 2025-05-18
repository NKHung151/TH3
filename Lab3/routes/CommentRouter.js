const express = require("express");
const mongoose = require("mongoose");
const Comment = require("../db/commentModel");
const router = express.Router();

// Tạo comment mới
router.post("/", async (req, res) => {
  try {
    const { comment, user, date_time, photo_id } = req.body;

    // Kiểm tra dữ liệu đầu vào cơ bản
    if (!comment || !user || !date_time || !photo_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Kiểm tra id hợp lệ
    if (
      !mongoose.Types.ObjectId.isValid(user) ||
      !mongoose.Types.ObjectId.isValid(photo_id)
    ) {
      return res.status(400).json({ error: "Invalid user or photo id" });
    }

    // Tạo mới comment
    const newComment = new Comment({
      comment,
      user,
      date_time,
      photo_id,
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Lấy tất cả comment (phục vụ test)
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find({}).exec();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
