import React, { useState, useEffect } from "react";
import { myRoutines } from "../api/Fetch";

const MyRoutines = ({ token, user }) => {
  const [myroutines, setMyRoutines] = useState([]);
  const username = user.username;
  useEffect(() => {
    const routines = async () => {
      const allMyRoutines = await myRoutines(token, username);
      setMyRoutines(allMyRoutines);
    };
    if (user.length) {
      routines();
    }
  }, [token]);
  if (!token) {
    return <div>Please Log in or Register!</div>;
  } else if (myroutines.length) {
    return (
      <div id="myroutines">
        <h2>My Routines</h2>
        <div id="routineinfo">
          {myroutines.map((routine) => {
            return (
              <div key={routine.id}>
                <p>Name: {routine.name}</p>
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
  } else {
    return <div>No Routines</div>;
  }
};

export default MyRoutines;
