const wasteService = require("../services/wasteService");

// Controller for handling detection request
exports.detectWaste = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Pass image path to service
    const result = await wasteService.detectWaste(req.file.path);

    res.json(result);
  } catch (error) {
    console.error("❌ Error in detectWaste:", error);
    res.status(500).json({ error: "Failed to process image" });
  }
};
