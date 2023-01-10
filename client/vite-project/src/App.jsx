import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Register,
  Home,
  Login,
  Nav,
  PublicRoutines,
  MyRoutines,
} from "./components/index";
import { Route, Routes } from "react-router-dom";
import { publicRoutines } from "./api/Fetch";
import { fetchMe } from "./api/auth";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [routines, setRoutines] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const routines = async () => {
      const allroutines = await publicRoutines();
      setRoutines(allroutines);
    };
    routines();
  }, []);

  useEffect(() => {
    const getMe = async () => {
      const data = await fetchMe(token);
      setUser(data);
    };
    if (token) {
      getMe();
    }
  }, [token]);

  return (
    <div>
      <Nav user={user}></Nav>
      <div id="MainPages">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/register"
            element={<Register setToken={setToken} />}
          ></Route>
          <Route path="/login" element={<Login setToken={setToken} />}></Route>
          <Route
            path="/routines"
            element={<PublicRoutines routines={routines} />}
          ></Route>
          <Route
            path="/myroutines"
            element={<MyRoutines token={token} user={user} />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
