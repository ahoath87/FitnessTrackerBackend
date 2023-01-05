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

async function getRoutineById(id) {
  try {
    const { rows: routines } = await client.query(
      `
    SELECT * FROM routines
    WHERE id = $1
    `,
      [id]
    );
    return routines;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows: routines } = await client.query(`
    SELECT * FROM routines
    `);
    return routines;
  } catch (error) {
    throw error;
  }
}

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

async function getPublicRoutinesByActivity({ id }) {
  try {
    const { rows: routines } = await client.query(
      `
      SELECT routines.*, users.username AS "creatorName", activities.id
      FROM routines
      JOIN users ON routines."creatorId" = users.id 
      JOIN activities ON activities.id  = routines.id   
      WHERE routines.id  = $1 AND routines."creatorId" = users.id AND routines."isPublic" = true
    `,
      [id]
    );

    console.log("this is routines.id", routines);
    return attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function updateRoutine({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  try {
    if (setString.length > 0) {
      const {
        rows: [routine],
      } = await client.query(
        `
      UPDATE routines
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
      `,
        Object.values(fields)
      );
      return routine;
    }
  } catch (error) {
    throw error;
  }
}

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
