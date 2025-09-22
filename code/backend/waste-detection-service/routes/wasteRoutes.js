const express = require("express");
const multer = require("multer");
const wasteController = require("../controllers/wasteController");

const router = express.Router();

// Multer config: save uploads in /uploads
const upload = multer({ dest: "uploads/" });

// POST /api/waste/detect
router.post("/detect", upload.single("image"), wasteController.detectWaste);

module.exports = router;
