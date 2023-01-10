import React from "react";

const PublicRoutines = ({routines}) => {
    console.log("this is routines in compPublicRoutines", routines);
     return (
        <div id="public-routines">
            <h2>Routines</h2>
            <div id="routines">
                {
                    routines.map((routine) => {
                        return (
                            <div key={routine.id}>
                                <p>Name: {routine.name}</p>
                                <p>Goal: {routine.goal}</p>
                                <p>Author: {routine.creatorName}</p>
                                <p>{console.log("this is routines.activities", routine.activities)}</p>
                                <div>
                                    {
                                        routine.activities.map((activity) => {
                                            return (
                                            <div key={activity.id}>
                                                <p>Activity: {activity.name}</p>
                                                <p>Description: {activity.description}</p>
                                                <p>Time: {activity.duration}</p>
                                                <p>Count: {activity.count}</p>
                                            </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            )
                    })
                }
            </div>
        </div>
     )
}

export default PublicRoutines