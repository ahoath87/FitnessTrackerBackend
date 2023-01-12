import React from "react";

const PublicActivities = ({ activities }) => {
  return (
    <div id="activities">
      <h2 id="activitieslabel">Activities</h2>
      <div id="activities">
        {activities.map((activity) => {
          return (
            <div key={activity.id}>
              <p>Name: {activity.name} </p>
              <p>Description: {activity.description} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PublicActivities;
