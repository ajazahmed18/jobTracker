const mongoose=require("mongoose");

const jobSchema=new mongoose.Schema({

    company:{
        type:String,
        required:true
    },

    position:{
        type:String,
        required:true
    },

    status:{
        type:String,
        required:true
    },

    location:{
        type:String,
        required:true
    },

    salary:{
        type:Number
    },

    userEmail:{
        type:String,
        required:true
    }
});

const JobModel=mongoose.model("Job",jobSchema);

module.exports=JobModel;