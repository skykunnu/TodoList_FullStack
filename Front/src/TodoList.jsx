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
        setIdToEdit(null);
      setIsEditing(false);

      }
      setIsEditing(false);

    }
    else{
      const obj={
        id:Date.now(),
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
      <div className='text-center ml-[28rem] bg-[#C49A6C] w-[430px]  p-4  rounded-md'>
        <form action="" onSubmit={handleSubmit} className='flex items-center gap-2'>
          <input
            type="text"
            placeholder="Enter your task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className=' px-5 py-2 mr-5 rounded-md text-xl bg-white'
          />
          <button type='submit' className='bg-black text-white px-3 py-2 rounded-md text-xl'>{isEditing ? "Edit Task":"Add Task"}</button>
        </form>
        
      </div>
  <ul className='w-[450px] px-5 mx-[27rem]'>
    {tasks.length>0 ? (
      tasks.map((task)=>( 
        <li key={task.id}  className="list-none flex items-center justify-between gap-5  mt-4 bg-[#f1a3d2] px-4 w-[26.8rem] py-2 rounded-md">
          <div className='flex items-center justify-center gap-10'>
          <input type="checkbox" checked={task.completed} onChange={()=>toggleComplete(task.id)} />
          <span style={{textDecoration:task.completed? "line-through": "none"}} className='text-2xl'>{task.title}</span>
          </div>
          <div className='flex items-center gap-3'>
          <button className='py-2 px-4 bg-green-600 text-white rounded-md text-sm font-bold disabled:opacity-50' onClick={()=> handleEdit(task.id)} disabled={task.completed} >Edit</button>
          <button className='py-2 px-2 bg-red-600 text-white rounded-md text-sm font-bold disabled:opacity-50' onClick={()=> handleDelete(task.id)} disabled={task.completed} >Delete</button>
          </div>
        </li>
      ))
    ):(
    <h3></h3>
    )}
  </ul>


      </>
    );
  }

  export default TodoList;
