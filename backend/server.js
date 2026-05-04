require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const groupRoutes = require("./routes/group.routes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/groups", groupRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App is running on PORT: http://localhost:${PORT}`);
});
