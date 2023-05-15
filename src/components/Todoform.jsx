import React, { useState } from "react";

const Todoform = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mt-5">
      <input
        type="text"
        className="border border-gray-400 py-2 px-4 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Add a new task"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-4"
      >
        Add
      </button>
    </form>
  );
};

export default Todoform;
