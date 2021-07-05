import "./App.css";
import React, { useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      const editTodo = todos.find((t) => t.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");

      return;
    }

    if (todo !== "") {
      setTodos([
        {
          id: `${todo}-${Date.now()}`,
          todo,
        },
        ...todos,
      ]);
    }

    setTodo("");
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((todo) => todo.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo List App</h1>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit"> {editId ? "Edit" : "Go"} </button>
        </form>

        <ul className="todos">
          {todos.map((todo) => (
            <li className="todo" key={todo.id}>
              <span>{todo.todo}</span>
              <div className="buttons">
                <button type="button" onClick={() => handleEdit(todo.id)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(todo.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
