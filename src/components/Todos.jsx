import React, { useState } from "react";

const Todos = ({ todos, deleteTodo, editTodo, toggleTodo }) => {
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState(null);

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editValue) return;
    editTodo(editId, editValue);
    setEditValue("");
    setEditId(null);
  };

  return (
    <ul className="list-disc list-inside">
      {todos.map((todo) => (
        <li key={todo._id} className="flex items-center py-2  mb-3">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600"
            checked={todo.completed}
            onChange={() => toggleTodo(todo._id)}
          />
          {editId === todo._id ? (
            <form onSubmit={handleEditSubmit} className="ml-4">
              <input
                type="text"
                className="border border-gray-400 py-2 px-4 rounded-lg"
                value={editValue}
                onChange={handleEditChange}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-4"
              >
                Save
              </button>
            </form>
          ) : (
            <div
              className={`ml-4 mr-3 ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
              onDoubleClick={() => {
                setEditValue(todo.title);
                setEditId(todo._id);
              }}
            >
              {todo.title}
            </div>
          )}
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg ml-auto"
            onClick={() => {
              setEditValue(todo.title);
              setEditId(todo._id);
            }}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg ml-4"
            onClick={() => deleteTodo(todo._id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Todos;
