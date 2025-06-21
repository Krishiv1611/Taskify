const express = require("express");
const { auth } = require("./middleware/middleware");
const { taskModel } = require("../database");
const taskRouter = express.Router();

taskRouter.post("/create", auth, async (req, res) => {
    const userId = req.userId;
    const { title, description, deadline } = req.body;
    try {
        await taskModel.create({ title, description, deadline, userId });
        res.json({ message: "Task created" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error creating task" });
    }
});

taskRouter.put("/update/:id", auth, async (req, res) => {
    const taskId = req.params.id;
    const userId = req.userId; // case-sensitive, matches middleware!
    const { title, description, deadline } = req.body;
    try {
        const updated = await taskModel.findOneAndUpdate(
            { _id: taskId, userId },
            { title, description, deadline },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }
        res.json({ message: "Task updated" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error updating task" });
    }
});

taskRouter.get("/mytasks", auth, async (req, res) => {
    const userId = req.userId;
    try {
        const tasks = await taskModel.find({ userId });
        res.json({ tasks });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server issue" });
    }
});

taskRouter.delete("/delete/:id", auth, async (req, res) => {
    const userId = req.userId;
    const taskId = req.params.id;
    try {
        const task = await taskModel.findOne({ _id: taskId, userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }
        await taskModel.deleteOne({ _id: taskId, userId });
        res.json({ message: "Task deleted" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server error" });
    }
});

taskRouter.get("/search", auth, async (req, res) => {
    const userId = req.userId;
    const { title } = req.query;
    try {
        if (!title) {
          return res.status(400).json({ message: "Title query is required" });
        }
        const tasks = await taskModel.find({
            userId,
            title: { $regex: title, $options: "i" }
        });
        if (tasks.length > 0) {
            res.json({ tasks });
        } else {
            res.status(404).json({ message: "No tasks found" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error searching tasks" });
    }
});


module.exports = {
    taskRouter
};
