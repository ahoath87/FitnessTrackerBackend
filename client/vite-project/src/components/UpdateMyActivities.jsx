import React, { useState } from "react";
import { updateCountAndDuration } from "../api/Fetch";

const UpdateMyActivities = ({
  token,
  routineActivityId,

  setRoutineActivityId,
  activity,
}) => {
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  if (openDropdown) {
    setRoutineActivityId(activity.routineActivityId);
  }

  return (
    <div id="updateDropdown">
      <button onClick={handleOpenDropdown}>Update Activities</button>
      {openDropdown ? (
        <form
          onSubmit={async (event) => {
            try {
              event.preventDefault();
              console.log("this is routineActivityId", routineActivityId);
              await updateCountAndDuration(
                token,
                count,
                duration,
                routineActivityId
              );
            } catch (error) {
              console.error(error);
            }
          }}
        >
          <div>
            <input
              id="count"
              value={count}
              type="number"
              placeholder="Count"
              onChange={(event) => setCount(event.target.value)}
            ></input>
            <input
              id="duration"
              value={duration}
              type="number"
              placeholder="Duration"
              onChange={(event) => setDuration(event.target.value)}
            ></input>
            <button id="countSubmit" type="submit">
              Update
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default UpdateMyActivities;
