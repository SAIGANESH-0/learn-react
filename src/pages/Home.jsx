import React, { useState, useEffect } from "react";
import Todoform from "../components/Todoform";
import Todos from "../components/Todos";
import { useContext } from "react";
import { AuthContext } from "../context/context";
import axios from "axios";

const Home = () => {
  const { User } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    if (User) {
      try {
        const token = User.token;
        const config = {
          headers: {
            authorization: token,
          },
        };
        // Make the GET request to the /todos endpoint with the token and userid as query parameters
        const response = await axios.get(
          "https://todo-server-f6oc.onrender.com/todos",
          config
        );
        setTodos(response.data.todos);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addTodo = async (todo) => {
    try {
      const data = {
        title: todo,
      };
      const token = User.token;
      const config = {
        headers: {
          authorization: token,
        },
      };
      // Make the GET request to the /todos endpoint with the token and userid as query parameters
      await axios.post(
        "https://todo-server-f6oc.onrender.com/todos",
        data,
        config
      );
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (id) => {
    const token = User.token;
    const config = {
      headers: {
        authorization: token,
      },
    };
    await axios
      .delete(`https://todo-server-f6oc.onrender.com/todos/${id}`, config)
      .then((response) => {
        console.log(response.data); // Should print {message: 'Todo deleted'}
        const updatedTodos = todos.filter((todo) => todo._id !== id);
        setTodos(updatedTodos);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleTodo = async (id) => {
    const updatedTodo = todos.filter((todo) => {
      if (todo._id === id) {
        return todo;
      }
    });
    updatedTodo[0].completed = !updatedTodo[0].completed;
    try {
      const data = updatedTodo[0];
      const token = User.token;
      const config = {
        headers: {
          authorization: token,
        },
      };
      // Make the GET request to the /todos endpoint with the token and userid as query parameters
      await axios.put(
        `https://todo-server-f6oc.onrender.com/todos/${id}`,
        data,
        config
      );
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  const editTodo = async (id, updatedTodo) => {
    const updatedTodoitem = todos.filter((todo) => {
      if (todo._id === id) {
        return todo;
      }
    });
    updatedTodoitem[0].title = updatedTodo;
    try {
      const data = updatedTodoitem[0];
      const token = User.token;
      const config = {
        headers: {
          authorization: token,
        },
      };
      // Make the GET request to the /todos endpoint with the token and userid as query parameters
      await axios.put(
        `https://todo-server-f6oc.onrender.com/todos/${id}`,
        data,
        config
      );
      const updatedTodos = todos.map((todo) => {
        if (todo._id === id) {
          return { ...todo, title: updatedTodo };
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };

  return (
    <>
      {User ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-xl mt-4 ">Add a To do list item </h1>
          <Todoform addTodo={addTodo} />
          <Todos
            todos={todos}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
          />
        </div>
      ) : (
        <h1 className="text-2xl text-center my-4 ">
          Please Sign in or Sign up to use the app{" "}
        </h1>
      )}
    </>
  );
};

export default Home;
