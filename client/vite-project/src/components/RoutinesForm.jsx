import React, { useState } from "react";
import { createNewRoutine } from "../api/Fetch";

const RoutineForm = ({ token, setRoutines, routines }) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      const newRoutine = await createNewRoutine(token, name, goal, isPublic);
      setRoutines([newRoutine, ...routines]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div id="routine-form">
      New Routine Form
      <form onSubmit={submitHandler}>
        <input
          value={name}
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          value={goal}
          type="text"
          placeholder="goal"
          onChange={(e) => setGoal(e.target.value)}
        ></input>
        <label>
          <input
            checked={isPublic}
            type="checkbox"
            onChange={(e) => setIsPublic(!isPublic)}
          ></input>
          Check to make public
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default RoutineForm;
