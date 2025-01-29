import express from "express"

import { addTodo } from "../controllers/todo.js";
import { fetchTodo } from "../controllers/todo.js";
import { deleteTodo } from "../controllers/todo.js";
import { editTodo } from "../controllers/todo.js";

const todoRouter=express.Router();

todoRouter.post("/add",addTodo);
todoRouter.get("/get",fetchTodo);
todoRouter.delete("/delete/:id",deleteTodo);
todoRouter.put("/edit/:id",editTodo);

export default todoRouter;