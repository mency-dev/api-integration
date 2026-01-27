import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Tasks() {
  const { id } = useParams(); // get the todo id from URL
  const [todo, setTodo] = useState(null);
  const [editing, setEditing] = useState(false); // toggle edit mode
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();

  // Fetch the todo from local data.json
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

  // Handle save (local state update for now)
  const handleSave = () => {
    const updatedTodo = {
      ...todo,
      title,
      completed,
    };

    // In real API, here you would do PUT request
    // Example: fetch(`/todos/${id}`, { method: 'PUT', body: JSON.stringify(updatedTodo), headers: { 'Content-Type': 'application/json' } })

    setTodo(updatedTodo); // update state locally
    setEditing(false); // exit edit mode
    alert("Todo updated locally! (mock PUT)");
  };

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
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      )}
    </div>
  );
}
