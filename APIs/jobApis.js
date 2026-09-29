const express=require("express");
const JobModel=require("../models/JobModel");
const verifyToken=require("../middleware/authMiddleware");

const jobApp=express.Router();

// Create a new job
jobApp.post("/",verifyToken,async(req,res)=>{
    try{

        // Add the logged-in user's email to the job
        const newJob=new JobModel({
            ...req.body,
            userEmail:req.user.email
        });

        await newJob.save();

        res.status(201).send({
            message:"Job added successfully",
            payload:newJob
        });

    }catch(err){

        res.status(500).send({
            message:"Error adding job",
            error:err.message
        });

    }
});

// Get all jobs of logged-in user
jobApp.get("/",verifyToken,async(req,res)=>{
    try{
        // Get only this user's jobs
        const jobs=await JobModel.find({
            userEmail:req.user.email
        });

        res.send({
            message:"Jobs fetched successfully",
            payload:jobs
        });

    }catch(err){

        res.status(500).send({
            message:"Error fetching jobs",
            error:err.message
        });

    }
});


//by id
// Get one job by ID
jobApp.get("/:id",verifyToken,async(req,res)=>{
    try{

        const job=await JobModel.findOne({
            _id:req.params.id,
            userEmail:req.user.email
        });

        if(!job){
            return res.status(404).send({
                message:"Job not found"
            });
        }

        res.send({
            message:"Job fetched successfully",
            payload:job
        });

    }catch(err){

        res.status(500).send({
            message:"Error fetching job",
            error:err.message
        });

    }
});
// Delete a job
jobApp.delete("/:id",verifyToken,async(req,res)=>{
    try{

        const deletedJob=await JobModel.findOneAndDelete({
            _id:req.params.id,
            userEmail:req.user.email
        });

        if(!deletedJob){
            return res.status(404).send({
                message:"Job not found"
            });
        }

        res.send({
            message:"Job deleted successfully",
            payload:deletedJob
        });

    }catch(err){

        res.status(500).send({
            message:"Error deleting job",
            error:err.message
        });

    }
});

module.exports=jobApp;