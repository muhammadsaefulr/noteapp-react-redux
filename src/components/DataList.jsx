import React from "react";
import { useSelector } from 'react-redux';

export default function DataList(){
    const todos = useSelector((state) => state.todos);

    return (
        <div className="">
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <span>{todo.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
