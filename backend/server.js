require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const requestRoutes = require("./routes/requestRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req,res) =>{
  res.send("backend connected successfully");
});

app.use("/api/requests", requestRoutes);

// Test Database Connection
pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.error("Database Connection Failed");
    console.error(err.message);
  } else {
    console.log(" Database Connected Successfully");
    console.log("Current Time:", result.rows[0].now);
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});