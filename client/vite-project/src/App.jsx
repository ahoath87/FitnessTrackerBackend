import React, { useEffect, useState } from "react";
import "./App.css";
import { Register, Home, Login, Nav, PublicRoutines } from "./components/index";
import { Route, Routes } from "react-router-dom";
import { publicRoutines } from "./api/Fetch";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    const routines = async () =>{
      const allroutines = await publicRoutines();
      setRoutines(allroutines)
    };
    routines(); 
  }, []);
  console.log("this is routines in main app", routines)
  return (
    <div>
      <Nav></Nav>
      <div id="MainPages">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/register"
          element={<Register setToken={setToken} />}
        ></Route>
        <Route path="/login" element={<Login setToken={setToken}/>}></Route>
        <Route path="/routines" element={<PublicRoutines routines={routines}/>}></Route>
      </Routes>
      </div>
    </div>
  );
}

export default App;
