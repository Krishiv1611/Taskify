require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const { userRouter } = require("./routes/user");
const { taskRouter } = require("./routes/task");

const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: process.env.FRONT_END, // Use FRONT_END from .env for CORS
  credentials: true
}));

app.use(express.json());

app.use("/users", userRouter);
app.use("/tasks", taskRouter);

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

main();


