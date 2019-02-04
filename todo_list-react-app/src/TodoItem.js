import React from 'react'; 

const TodoItem = ({name, completed}) => (
    <li
    // easy way to conditionally style an element 
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {name}
    </li>
)

export default TodoItem; 
