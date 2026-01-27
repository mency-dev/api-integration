import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Tasks() {
  const { id } = useParams(); 
  const [todo, setTodo] = useState(null);
  const [editing, setEditing] = useState(false); 
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((t) => t.id === parseInt(id));
        setTodo(found);

        if (found) {
          setTitle(found.title);
          setCompleted(found.completed);
        }
      });
  }, [id]);

  if (!todo) return <p>Loading...</p>;

  
  const handleSave = () => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        title,completed
      })
    })
    .then((res) => res.json())
    .then((data) => {
      setTodo(data);
      setEditing(false);
    });
  };
  function handleDelete() {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setTodo(data);
        navigate(-1);
      });
  }

  return (
    <div>
      <h1>Todo Details</h1>

      {editing ? (
        <div>
          <label>
            Title:{" "}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <label>
            Completed:{" "}
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </label>
          <br />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>
            <strong>Title:</strong> {todo.title}
          </p>
          <p>
            <strong>Completed:</strong> {todo.completed ? "Yes" : "No"}
          </p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => handleDelete()}>Delete</button>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      )}
    </div>
  );
}
