import { useState, useEffect } from "react";
import axios from "axios";


function TodoList() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [idToEdit, setIdToEdit] = useState(null);

   useEffect(() => {
     fetchData();
   }, [tasks])

   async function fetchData(){
    const result=await axios.get('http://localhost:3000/api/todos/get')
    setTasks(result.data);
   }

   async function handleSubmit(e){
    e.preventDefault();

    if(isEditing){

      const obj={
        id:idToEdit,
        title:input,
      };
      const response = await axios.put(`http://localhost:3000/api/todos/edit/${idToEdit}`, obj);

    if(response.data.message==="Todo Updated"){
      fetchData();
      setIsEditing(false);
      setIdToEdit(null);
    }


   }
   else{
    const obj={
      id:Date.now().toString(),
      title:input,
      completed:false,
    };
    const response=await axios.post("http://localhost:3000/api/todos/add",obj)
 if(response.status===201 && response.data.message==="Todo Saved"){
  fetchData()
 }
  }
  
  setInput("")
  }




async function handleDelete(id){
  const response=await axios.delete(`http://localhost:3000/api/todos/delete/${id}`);
  if(response.data.message==="Todo Deleted"){
    fetchData();
  }
}

async function handleEdit(id){
  const task=tasks.find((task)=>task.id===id);
  setInput(task.title);
  setIdToEdit(task.id);
  setIsEditing(true);
}


async function toggleComplete(id){

  const task = tasks.find((task) => task.id === id);
  const updatedTask = {
    ...task,
    completed: !task.completed,
  };

  const response = await axios.put(`http://localhost:3000/api/todos/edit/${id}`, updatedTask);
  if (response.data.message === "Todo Updated") {
    fetchData();
  }

}


  return (
    <>
    <div className='text-center mt-12'>
    <h1 className='text-5xl font-bold'>Todo App</h1>
    </div>
    <div className='text-center  mt-10 ml-[27rem] bg-[#d2691e]  w-[500px] height-[20px] px-5 py-5 rounded-md'>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className=' px-5 py-2 mr-5 rounded-md text-xl bg-white'
        />
        <button type='submit' className='bg-black text-white px-5 py-2 rounded-md text-xl'>{isEditing ? "Edit Task":"Add Task"}</button>
      </form>
<ul>
  {tasks.length>0 ? (
    tasks.map((task)=>( 
       <li key={task.id} style={{textDecoration:task.completed? "line-through": "none"}} className="list-none">
        {task.title}
        <button onClick={()=> handleEdit(task.id)}>Edit</button>
        <button onClick={()=> handleDelete(task.id)}>Delete</button>
        <input type="checkbox" checked={task.completed} onChange={()=>toggleComplete(task.id)} />
      </li>
    ))
  ):(
  <h3></h3>
  )}
</ul>
    </div>


    </>
  );
}

export default TodoList;
