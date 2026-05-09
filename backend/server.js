require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const multer = require("multer");

const authRoutes = require("./routes/auth.routes");
const groupRoutes = require("./routes/group.routes");
const memberRoutes = require("./routes/member.routes");

const errorHandler = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/members", memberRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on PORT: http://localhost:${PORT}`);
});
