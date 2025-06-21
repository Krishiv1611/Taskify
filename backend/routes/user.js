require("dotenv").config();
const express = require("express");
const userRouter = express.Router(); 
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../database");

const JWT_SECRET = process.env.JWT_SECRET;

userRouter.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET);

        res.status(201).json({
            message: "Successfully registered",
            token
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
});

userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Incorrect credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        res.json({
            message: "Login successful",
            token
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = {
    userRouter
}

