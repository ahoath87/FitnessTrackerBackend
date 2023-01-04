const client = require("./client");
const { attachActivitiesToRoutines, getActivityById } = require("./activities");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
    INSERT INTO routines("creatorId", "isPublic", name, goal)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `,
      [creatorId, isPublic, name, goal]
    );
    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutineById(id) {}

async function getRoutinesWithoutActivities() {}

async function getAllRoutines() {
  try {
    const { rows: routines } = await client.query(`
        SELECT routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId" = users.id ;`);

    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

// async function getAllPublicRoutines() {
//   try {
//     const returnedRoutines = await getAllRoutines();
//     const publicRoutines = returnedRoutines.filter(
//       (routine) => routine.isPublic === true
//     );
//     return attachActivitiesToRoutines(publicRoutines);
//   } catch (error) {
//     throw error;
//   }
// }
async function getAllPublicRoutines() {
  try {
    const { rows: routines } = await client.query(`
          SELECT routines.*, users.username AS "creatorName"
          FROM routines
          JOIN users ON routines."creatorId" = users.id 
          WHERE routines."isPublic" = true;`);

    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

// async function getAllRoutinesByUser({ username }) {
//   try {
//     const returnedRoutines = await getAllRoutines();
//     const userRoutines = returnedRoutines.filter(
//       (routine) => routine.creatorName === username
//     );
//     return attachActivitiesToRoutines(userRoutines);
//   } catch (error) {
//     throw error;
//   }
// }
async function getAllRoutinesByUser({ username }) {
  try {
    const { rows: routines } = await client.query(
      `
          SELECT routines.*, users.username AS "creatorName"
          FROM routines
          JOIN users ON routines."creatorId" = users.id 
          WHERE username = $1 AND routines."creatorId" = users.id`,
      [username]
    );

    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

// async function getPublicRoutinesByUser({ username }) {
//   try {
//     const returnedRoutines = await getAllPublicRoutines();
//     const publicUserRoutines = returnedRoutines.filter(
//       (routine) => routine.creatorName === username
//     );
//     return attachActivitiesToRoutines(publicUserRoutines);
//   } catch (error) {
//     throw error;
//   }
// }

async function getPublicRoutinesByUser({ username }) {
  try {
    const { rows: routines } = await client.query(
      `
          SELECT routines.*, users.username AS "creatorName"
          FROM routines
          JOIN users ON routines."creatorId" = users.id 
          WHERE username = $1 AND routines."creatorId" = users.id AND routines."isPublic" = true`,
      [username]
    );

    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

// async function getPublicRoutinesByActivity({ id }) {
//   console.log("this is id", id);
//   const activity = await getActivityById(id);
//   const routinesToReturn = [...routines];
//   console.log("this is activity", activity);
//   try {
//     const publicRoutines = await getAllPublicRoutines();

//     const publicRoutinesByActivity = publicRoutines.filter(
//       (routine) => routine.activities == activity.name
//     );

//     console.log("this is public routinesby actibity", publicRoutines);
//     return publicRoutinesByActivity;
//   } catch (error) {
//     throw error;
//   }
// }
// you are going to do two joins in teh same query and you ahve to in order to get what you need.

async function getPublicRoutinesByActivity({ id }) {
  try {
    const { rows: routines } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName", routine_activities."activityId"
      FROM routines
      JOIN users ON routines."creatorId" = users.id 
      JOIN routine_activities ON routines.id = "activityId"
      WHERE "activityId" = $1 AND routines."creatorId" = users.id AND routines."isPublic" = true
    `,
      [id]
    );
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function updateRoutine({ id, ...fields }) {}

async function destroyRoutine(id) {}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
