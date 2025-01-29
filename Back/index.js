import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from 'cors';



const app = express();
const port = process.env.PORT;


app.use(cors({origin:"https://todolist-fullstack-1-cuie.onrender.com"}));

// app.use(cors({
//     origin:[" http://localhost:5173"],
//     method:["POST, GET"],
//     Credential:true
// }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



await mongoose.connect("mongodb+srv://shikharkhandelwal27:48cac0MwaFYt0zYs@cluster0.dlqaa.mongodb.net/todolistfullstack?retryWrites=true&w=majority&appName=Cluster0");

// Schema

const todoSchema= new mongoose.Schema({
    id:{type:String, required: true},
    title:{type:String, required: true},
    completed:{type:Boolean, required: true},
})

const Todo=mongoose.model("Todo", todoSchema);



app.get("/api/todos/get",async(req,res)=>{
    
const todos=await Todo.find();
res.send(todos);
})

app.post("/api/todos/add",async(req,res)=>{

const {id, title, completed}=req.body;
const newTodo= new Todo({
id,
title,
completed,

});
await newTodo.save();
res.status(201).send({message:"Todo Saved"});
})

app.put("/api/todos/edit/:id",async(req,res)=>{
    const id=req.params.id;
    const {title, completed}=req.body;
    await Todo.findOneAndUpdate({id},{title,completed});
    res.send({meesage: "Todo Updated"});
})

app.delete("/api/todos/delete/:id", async(req,res)=>{
    const id=req.params.id;
    await Todo.findOneAndDelete({id});
    res.send({message:"Todo Deleted"});
});


app.listen(port, () => {
    console.log("Server started at port" +  port);
  });
  