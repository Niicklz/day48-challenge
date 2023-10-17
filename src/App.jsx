import React, { useState } from "react";
import { Todos } from "./components/Todos/Todos";

export const App = () => {
    const [newTask, setNewTask] = useState("");
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("TASKS")) || [])


  const aggreeTask = () => {
    const taskToAgree = newTask.trim()
    const values = todos.map((tasks) => tasks.text);
    if(taskToAgree.trim() === "") return
    if (values.includes(taskToAgree)) {
      setNewTask("");
      alert("Tarea ya existe")
      return;
    }
    localStorage.setItem(
      "TASKS",
      JSON.stringify([{ text: newTask, completed: false }, ...todos ])
    );
    setTodos((todos) => [{ text: newTask, completed: false }, ...todos ]);

    setNewTask("");
   
  };

  const finishTask = (text, e) => {
  if(e.target.id === "delete") return
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text == text);
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    localStorage.setItem("TASKS", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const deleteTask = (taskDeleted) => {
    
    const newTodos = todos.filter((task) => task.text != taskDeleted);
    localStorage.setItem("TASKS", JSON.stringify(newTodos));
    setTodos(newTodos);
    
  };


  const handleSubmit = (e)=> {
    e.preventDefault()
    aggreeTask()

  }
  return (
    <div className="container">
      <h1>todos</h1>
      <form action="" onSubmit={handleSubmit}>
      <input
          className="input"
          type="text"
          placeholder="Enter your todo"
         
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          maxLength={50}
        />
      </form>
        
     
      <div className="todos-container">
        {todos.length > 0 && todos.map(todo => (
            <Todos finishTask={finishTask} completed={todo.completed} deleteTask={deleteTask} text={todo.text} key={todo.text}/>
        ) )  }
      </div>
      <p className="instructions">
        <span>Left click to toggle completed.</span>
        <span>Right click to delete todo.</span>
      </p>
      <div></div>
    </div>
  );
};
