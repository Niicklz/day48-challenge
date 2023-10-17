import React from "react";
import "./Todos.css";

export const Todos = ({ text, deleteTask, completed, finishTask }) => {
  return (
    <div
      className="todo"
      onContextMenu={(e) => {
        e.preventDefault();
        deleteTask(text);
      }}
      onClick={(e) => finishTask(text, e)}
    >
      <p className={`${completed ? "completed" : ""}`}>{text}</p>
      <span id="delete" className="material-symbols-outlined notranslate" onClick={(e)=> deleteTask(text, e)}>delete</span>
    </div>
  );
};
