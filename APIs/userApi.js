const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/UserModel");
const verifyToken = require("../middleware/authMiddleware");
const userApp = express.Router();


// regestration

userApp.post("/register", async (req, res) => {

    try {

        // Get data from request body
        const newUser = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({
            email: newUser.email
        });

        if (existingUser) {
            return res.status(409).send({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(
            newUser.password,
            10
        );

        // Replace normal password with hashed password
        newUser.password = hashedPassword;

        // Create Mongoose document
        const newUserDoc = new UserModel(newUser);

        // Save document into MongoDB
        await newUserDoc.save();

        res.status(201).send({
            message: "User registered successfully"
        });

    } catch (err) {

        res.status(500).send({
            message: "Error registering user",
            error: err.message
        });

    }

});


// authentication 

userApp.post("/login", async (req, res) => {

    try {

        // Get login data
        const loginUser = req.body;

        // Find user by email
        const user = await UserModel.findOne({
            email: loginUser.email
        });

        // Check if user exists
        if (!user) {
            return res.status(401).send({
                message: "Invalid email or password"
            });
        }

        // Compare entered password with hashed password
        const isPasswordCorrect = await bcrypt.compare(
            loginUser.password,
            user.password
        );

        // Check password
        if (!isPasswordCorrect) {
            return res.status(401).send({
                message: "Invalid email or password"
            });
        }

        // Create JWT token
      const token=jwt.sign(
    {
        email:user.email
    },
    process.env.JWT_SECRET,
    {
        expiresIn:"1h"
    }
);
        // Send token
        res.send({
            message: "Login successful",
            token: token
        });

    } catch (err) {

        res.status(500).send({
            message: "Login failed",
            error: err.message
        });

    }

});





// Export router
module.exports = userApp;



//verifying jwt token and accessing profile (using middleware)
userApp.get("/profile",verifyToken,async(req,res)=>{
    try{

        const user=await UserModel.findOne({
            email:req.user.email
        }).select("-password");

        res.send({
            message:"Profile accessed successfully",
            user:user
        });

    }catch(err){

        res.status(500).send({
            message:"Error fetching profile",
            error:err.message
        });

    }
});