import mongoose from "mongoose"



const todoSchema= new mongoose.Schema({
    id:{type:String, required: true},
    title:{type:String, required: true},
    completed:{type:Boolean, required: true},
})

export const Todo=mongoose.model("Todo", todoSchema);