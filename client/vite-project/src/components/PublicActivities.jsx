import React from "react";

const PublicActivities = ({ activities }) => {
  return (
    <div id="activities">
      <h2 id="activitieslabel">Activities</h2>
      <div id="activities-box">
        {activities.map((activity) => {
          return (
            <div id="activity-details" key={activity.id}>
              <p id="activity-name">Name: {activity.name} </p>
              <p>Description: {activity.description} </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PublicActivities;
