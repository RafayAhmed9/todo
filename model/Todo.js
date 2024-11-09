const mongoose=require("mongoose");


const todoSchema=mongoose.Schema(
    {
        title:{
            type: String,
            require: true
        },

        description:{
            type: String,
            require: false,
        },

        iscomplete:{
            type:Boolean,
            default:false
        }
        
    },
    { timestamps: true }
);

const todo=mongoose.model("todo",todoSchema);

module.exports=todo;