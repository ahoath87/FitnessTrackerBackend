import React, { useState, useEffect } from "react";
import { myRoutines } from "../api/Fetch";
import { RoutineForm } from "./index";
import { Link } from "react-router-dom";

const MyRoutines = ({ token, setRoutines, routines, myroutines, setRoutineToEdit, setRoutineToDelete }) => {
  if (!token) {
    return <div>Please Log in or Register!</div>;
  } else if (myroutines.length === 0) {
    return (
      <div>
        <div>No Routines</div>
        <div>
          <RoutineForm
            setRoutines={setRoutines}
            routines={routines}
            token={token}
          ></RoutineForm>
        </div>
      </div>
    );
  } else {
    return (
      <div id="myroutines">
        <h2>My Routines</h2>
        <div>
          <RoutineForm
            setRoutines={setRoutines}
            routines={routines}
            token={token}
          ></RoutineForm>
        </div>
        <div id="routineinfo">
          {myroutines.map((routine) => {
            return (
              <div key={routine.id}>
                <p id="name-myroutines"> Name: {routine.name}</p>
                <button id="edit-button" onClick={()=> setRoutineToEdit(routine)}>
                  <Link to="/updateroutine">Edit</Link>
                </button>
                <button id="DeleteButton" onClick={()=> setRoutineToDelete(routine)}>Delete</button>
                <p>Goal: {routine.goal}</p>
                <p>Author: {routine.creatorName}</p>
                <div>
                  {routine.activities.map((activity) => {
                    return (
                      <div key={activity.id}>
                        <p>Activity: {activity.name}</p>
                        <p>Description: {activity.description}</p>
                        <p>Time: {activity.duration}</p>
                        <p>Count: {activity.count}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default MyRoutines;
