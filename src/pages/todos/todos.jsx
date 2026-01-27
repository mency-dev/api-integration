import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((res) => res.json())
        .then((data) => {
          setTodos(data);
          localStorage.setItem("todos", JSON.stringify(data));
        });
    
  }, []);


  function handleClick(id) {
    navigate(`/todo/${id}`);
  }

  return (
    <div>
      
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(todo.id)}
          >
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
