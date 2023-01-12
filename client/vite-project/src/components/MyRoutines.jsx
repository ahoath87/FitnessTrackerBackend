import React, { useState, useEffect } from "react";
import { myRoutines } from "../api/Fetch";
import { RoutineForm, Dropdown } from "./index";
import { Link } from "react-router-dom";

const MyRoutines = ({
  token,
  setRoutines,
  routines,
  myroutines,
  setRoutineToEdit,
  setRoutineToDelete,
  activities,
  addActivity,
  setAddActivity,
  checked,
  setChecked,
  routineToAddActivity,
  setRoutineToAddActivity
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

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
                <button
                  id="edit-button"
                  onClick={() => setRoutineToEdit(routine)}
                >
                  <Link to="/updateroutine">Edit</Link>
                </button>
                <button
                  id="delete-button"
                  onClick={() => setRoutineToDelete(routine)}
                >
                  Delete
                </button>
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
                <Dropdown
                  open={open}
                  activities={activities}
                  addActivity={addActivity}
                  setAddActivity={setAddActivity}
                  trigger={<button onClick={handleOpen}>Activities</button>}
                  checked={checked}
                  setChecked={setChecked}
                  routineToAddActivity={routineToAddActivity}
                  setRoutineToAddActivity={setRoutineToAddActivity}
                  myRoutine={routine}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default MyRoutines;
