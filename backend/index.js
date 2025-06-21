require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

const { userModel, taskModel } = require("./database");
const { userRouter } = require("./routes/user");
const { taskRouter } = require("./routes/task");

const JWT_SECRET = process.env.JWT_SECRET;
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
app.use(express.json());
app.use("/users", userRouter);
app.use("/tasks", taskRouter);
async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");

        app.listen(process.env.PORT||8000, () => {
            console.log("Server listening on port 8000");
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

main();

