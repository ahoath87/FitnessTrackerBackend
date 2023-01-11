import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Register,
  Home,
  Login,
  Nav,
  PublicRoutines,
  MyRoutines,
  RoutineForm,
} from "./components/index";
import { Route, Routes } from "react-router-dom";
import { publicRoutines, myRoutines, fetchDeleteRoutine } from "./api/Fetch";
import { fetchMe } from "./api/auth";
import UpdateRoutine from "./components/UpdateRoutine";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [routines, setRoutines] = useState([]);
  const [user, setUser] = useState({});
  const [myroutines, setMyRoutines] = useState([]);
  const [routineToEdit, setRoutineToEdit] = useState({});
  const [routineToDelete, setRoutineToDelete] = useState({});

  const username = user.username;
console.log("this is routineToDelete", routineToDelete);
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

  useEffect(() => {
    const getRoutines = async () => {
      const allMyRoutines = await myRoutines(token, username);
      setMyRoutines(allMyRoutines);
    };
    if(user.username) {
      getRoutines();
    }
  }, [user.username]);

  useEffect(() =>{
    const getNotDeletedRoutines = async () => {
      await fetchDeleteRoutine(token, routineToDelete);
      const redirMyRoutines = () => {
        window.location.href = '/myroutines'
    };
    redirMyRoutines();
    }
    if(routineToDelete.id) {
      getNotDeletedRoutines();
    }
  }, [routineToDelete])

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
            element={<MyRoutines setRoutineToDelete={setRoutineToDelete} token={token} user={user} setRoutines={setRoutines} routines={routines} myroutines={myroutines} setRoutineToEdit={setRoutineToEdit} />}
          ></Route>
          <Route 
          path="/updateroutine" 
          element={<UpdateRoutine myroutines={myroutines} routines={routines} routineToEdit={routineToEdit} token={token} setRoutines={setRoutines} setMyRoutines={setMyRoutines} />}>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
