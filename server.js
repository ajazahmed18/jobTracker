require("dotenv").config();



const express = require("express");
const mongoose = require("mongoose");

const userApp = require("./APIs/userApi");
const jobApp = require("./APIs/jobApis");

const app = express();

// Middleware
app.use(express.json());

// User routes
app.use("/users", userApp);

// Job routes
app.use("/jobs", jobApp);

// Home route
app.get("/", (req, res) => {
    res.send("JobTrack API is running");
});

// Connect MongoDB
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB connected successfully");

        // Start server
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });