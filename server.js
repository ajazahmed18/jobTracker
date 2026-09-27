const express = require("express");
const mongoose = require("mongoose");

const userApp = require("./APIs/userApi");

const app = express();


// Middleware
app.use(express.json());


// User routes
app.use("/users", userApp);


// Home route
app.get("/", (req, res) => {
    res.send("JobTrack API is running");
});


// Connect MongoDB
mongoose.connect("mongodb://localhost:27017/jobtrack")
    .then(() => {

        console.log("MongoDB connected successfully");

        // Start server
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });

    })
    .catch((err) => {

        console.log("MongoDB connection error:", err);

    });