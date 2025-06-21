const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
    deadline: { type: Date },
    userId: { type: ObjectId, ref: "users", required: true }
});

const userModel = mongoose.model("users", UserSchema);
const taskModel = mongoose.model("tasks", TaskSchema);

module.exports = {
    userModel,
    taskModel
};
