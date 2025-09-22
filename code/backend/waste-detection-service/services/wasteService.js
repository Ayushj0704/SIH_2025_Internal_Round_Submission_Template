const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY;
const MODEL_URL = process.env.ROBOFLOW_MODEL_URL;

// Service: send image to Roboflow API
exports.detectWaste = async (imagePath) => {
  try {
    // Read image as base64
    const image = fs.readFileSync(imagePath, { encoding: "base64" });

    const response = await axios({
      method: "POST",
      url: MODEL_URL,
      params: {
        api_key: ROBOFLOW_API_KEY,
      },
      data: image,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const predictions = response.data.predictions || [];
    const top = predictions[0] || null;

    return {
      predictions,
      topPrediction: top ? top.class : "unknown",
    };
  } catch (error) {
    console.error("❌ Roboflow API Error:", error.response?.data || error.message);
    throw new Error("Roboflow detection failed");
  }
};
