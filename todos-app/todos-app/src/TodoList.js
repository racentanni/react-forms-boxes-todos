import React, { useState, useEffect } from 'react';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';
import './TodoList.scss';

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task) => {
    setTodos([...todos, { id: Date.now(), task }]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, newTask) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, task: newTask } : todo)));
  };

  return (
    <div className='TodoList'>
        <h1>Todo List</h1>
      <NewTodoForm addTodo={addTodo} />
      {todos.map(todo => (
        <Todo
          key={todo.id}
          id={todo.id}
          task={todo.task}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;