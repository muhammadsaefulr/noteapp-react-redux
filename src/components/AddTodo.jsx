import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { addTodo } from "../slice/todoSlice";

export default function AddTodo() {
    const [text, setText] = useState('');

    const dispatch = useDispatch();

    const addTodoHandler = (event) => {
        event.preventDefault();

        dispatch(addTodo(text));
        setText('')
        console.log(text)
    }

    return (
        <form onSubmit={addTodoHandler}>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <button>Add</button>
        </form>
    )

}