import React, { useState } from "react";
import { PublicActivities } from "./index";

const Dropdown = ({
  open,
  trigger,
  activities,
  addActivity,
  setAddActivity,
}) => {
  const [checked, setChecked] = useState(false);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (checked) {
        setAddActivity(activity);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div id="dropdown">
      {trigger}
      {open ? (
        <form onSubmit={submitHandler}>
          <div id="dropdown-activities">
            {activities.map((activity) => {
              return (
                <div key={activity.id}>
                  <p>Name: {activity.name} </p>
                  <input
                    id="dropdown-checkbox"
                    type="checkbox"
                    value={activity.name}
                    name={activity.name}
                    checked={checked}
                    onChange={(e) => e.preventDefault() && setChecked(!checked)}
                  ></input>
                </div>
              );
            })}
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default Dropdown;
