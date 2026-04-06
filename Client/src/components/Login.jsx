import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:8080/user/login",

        {

          email,
          password,
        },
        {
          // 
        }
      );

      // console.log(data);
      // toast.success(data.message || "User Login Successfully");
      // localStorage.setItem("jwt", data.token);
      // setToken(data.token);
      // navigateTo("/todo")
      // setEmail("");
      // setPassword("");

      console.log(data);

      toast.success(data.message || "User Login Successfully");

      // ⭐ DEBUG START
      console.log("TOKEN:", data.token);

      // ⭐ Step 1
      localStorage.setItem("jwt", data.token);

      // ⭐ Step 2 (check storage)
      console.log("Stored:", localStorage.getItem("jwt"));

      // ⭐ Step 3 (safe)
      if (setToken) {
        setToken(data.token);
      }

      // ⭐ Step 4
      navigateTo("/todo");

    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">

      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-sm text-white border border-white/10">

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm block mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm block mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg font-semibold transition-all active:scale-95"
          >
            Login
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-sm mt-4 text-white/70">
          New User?{" "}
          <Link to="/" className="text-blue-400 hover:underline cursor-pointer">
            Sign-up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;