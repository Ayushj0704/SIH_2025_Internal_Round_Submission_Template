// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

const wasteRoutes = require("./routes/wasteRoutes"); // ✅ adjust path if different

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json()); // replaces body-parser
app.use(express.urlencoded({ extended: true }));

// ✅ API Routes
app.use("/api/waste", wasteRoutes);

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.json({ message: "♻️ Waste Detection Service is running 🚀" });
});

// ✅ Start server
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Waste Detection Service running at http://localhost:${PORT}`);
});
