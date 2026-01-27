import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  function handleClick(id) {
    navigate(`/todo/${id}`); // navigate to details page
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
            <input type="checkbox" checked={todo.completed} disabled />
            <span>{todo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
