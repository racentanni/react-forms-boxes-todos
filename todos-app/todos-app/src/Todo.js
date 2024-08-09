import React, { useState } from 'react';
import './Todo.scss';

function Todo({ id, task, removeTodo, updateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTask, setNewTask] = useState(task);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateTodo(id, newTask);
    setIsEditing(false);
  };

  const handleToggleCompleted = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className={`Todo ${isCompleted ? 'completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <span>{task}</span>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleToggleCompleted}>
            {isCompleted ? 'Unmark' : 'Mark as completed'}
          </button>
          <button onClick={() => removeTodo(id)}>X</button>
        </>
      )}
    </div>
  );
}

export default Todo;