import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState(" ");

  const navigate = useNavigate();

  //fetch todos
  useEffect(() => {
    const fetchtodos = async () => {
      try {
        setLoading(true);

        const response = await axios.get("http://localhost:8080/todo/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(response.data);
        setTodos(response.data.todo);
        setError(null);
      } catch (error) {
        setError("Failed to fetch the todo data");
      } finally {
        setLoading(false);
      }
    };

    fetchtodos();
  }, []);

  //create todo
  const todoCreate = async () => {
    if (!newTodo) return; // empty check

    try {
      const response = await axios.post(
        "http://localhost:8080/todo/create",
        {
          text: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        },
      );

      setTodos([...todos, response.data.newTodo]);

      setNewTodo("");
    } catch (error) {
      setError("Failed to Create the todo data");
    }
  };

  //todos Update status
  const todoStatus = async (id) => {
    const selectedTodo = todos.find((t) => t._id === id);

    if (!selectedTodo) return;

    try {
      const response = await axios.put(
        `http://localhost:8080/todo/update/${id}`,
        {
          ...selectedTodo,
          completed: !selectedTodo.completed,
        },
        {
          withCredentials: true,
        },
      );

      console.log(response.data);

      // update in  UI
      setTodos((prev) => prev.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      setError("Failed to update todo status");
    }
  };

  //delete todos
  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/todo/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      // ✅ UI remove
      setTodos((prev) => prev.filter((t) => t._id !== id));

    } catch (error) {
      setError("Failed to delete the todo data");
    }
  };

  //logout user
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8080/user/logout");

      localStorage.removeItem("jwt"); // 

      toast.success("Logout successfully");

     navigate("/login");

    } catch (error) {
      toast.error("Failed to Logout");
    }
  };


  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 text-white border border-white/10">

        {/* Heading */}
        <h1 className="text-2xl font-bold mb-4 border-b border-white/20 pb-2 tracking-wide">
          📝 My Todos
        </h1>

        {/* Input Section */}
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
            onKeyPress={(e) => e.key === "enter" && todoCreate()}
            placeholder="Add new todo..."
            className="flex-1 px-4 py-2 rounded-lg bg-white/20 placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <button
            onClick={todoCreate}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:scale-95 rounded-lg transition-all">
            Add
          </button>

        </div>

        {/* Todo List */}

        {loading ? (<div className="text-center"><span>Loading...</span> </div>) : error ? (<div className="text-center text-red-500">{error}</div>) : (


          <ul className="space-y-3 max-h-64 overflow-y-auto pr-1">

            {todos.map((todo, index) => (
              <li
                key={todo._id || index}
                className="flex items-center justify-between bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <input type="checkbox" checked={todo.completed} onChange={() => todoStatus(todo._id)} className="accent-blue-500 w-4 h-4 cursor-pointer" />
                  <span className={`${todo.completed ? " line-through text-sm tracking-wide" : ""}`}>{todo.text}</span>
                </div>

                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-sm cursor-pointer"
                >
                  Delete
                </button>
              </li>
            ))}

          </ul>
        )}


        {/* Footer */}
        <div className="mt-5 text-sm text-white text-center space-y-2">
          <p>{remainingTodos}  Remaining Todos</p>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 active:scale-95 px-4 py-1.5 rounded-lg text-white transition-all">
            Logout
          </button>
        </div>
      </div>
    </div>
  )

}


export default Home;