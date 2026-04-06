// import React from 'react'
// import Home from "./components/Home"
// import Login from "./components/Login"
// import SignUp from "./components/Signup"
// import { Route, Routes,Navigate} from 'react-router-dom'

// import { ToastContainer, toast } from 'react-toastify';

// function App() {
//   const token = localStorage.getItem("jwt");
//   return (
//     <div>
//       <Routes>
//         <Route path="/todo" element={token ? <Home /> : <Navigate to={"/login"} />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/" element={<SignUp />} />
//       </Routes>
//       <ToastContainer />
//     </div>
//   )
// }

// export default App






import React, { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  return (
    <>
      <Routes>
        <Route
          path="/todo"
          element={
            token ? (  <Home setToken={setToken} />) : (  <Navigate to="/login" />  )
          }
        />
        <Route
          path="/login"  element={<Login setToken={setToken} />}
        />
        <Route path="/" element={<SignUp />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;