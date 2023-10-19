// src/TodoApp.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, editTodo, deleteTodo } from '../slice/todoSlice'

const TodoApp = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const handleAddTodo = () => {
    if (text) {
      dispatch(addTodo({ id: Date.now(), text, completed: false }));
      setText('');
    }
  };

  const [editingTodoId, setEditingTodoId] = useState(null)
  const [editingTodoText, setEditingTodoText] = useState('')

  const handleEditTodo = (todo) => {
    setEditingTodoId(todo.id);
    setEditingTodoText(todo.text);
  }

  const handleSaveEdit = () => {
    dispatch(editTodo({ id: editingTodoId, text: editingTodoText }));
    setEditingTodoId(null);
    setEditingTodoText('');
  }

  const handleCancelEdit = () => {
    setEditingTodoId(null),
    setEditingTodoText('')
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new todo"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li style={{ listStyle: 'none', textDecoration: 'none'}} key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.id === editingTodoId ? (
                <input type="text" value={editingTodoText} onChange={(e) => setEditingTodoText(e.target.value)} />
              ) : (
              <p style={{fontSize: '20px'}}>{todo.text}</p>
              )}
            </span>
            <button onClick={() => handleEditTodo(todo)}>Edit</button>
            {todo.id === editingTodoId ? (
              <div className="">
                <button onClick={handleSaveEdit}>Simpan</button>
                <button onClick={handleCancelEdit}>Batalkan</button>
              </div>
            ) : (
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
