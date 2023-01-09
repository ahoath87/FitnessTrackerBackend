import React, { useState } from "react";
import "./App.css";
import { Register, Home } from "./components/index";
import { Route, Routes } from "react-router-dom";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div>
      <h1>Fitness Tracker</h1>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/register"
          element={<Register setToken={setToken} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
