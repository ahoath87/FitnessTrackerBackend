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
    const { rows: [routines] } = await client.query(
      `
    SELECT * FROM routines
    WHERE id = $1
    `,
      [id]
    );
    if (!routines) {
      return null
    }
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

async function getPublicRoutinesByUser({ username }) {
  console.log("this is username inside of getpublicroutinesbyuser", username);
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
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id 
      JOIN routine_activities ON routines.id = routine_activities."routineId"   
      WHERE routine_activities."activityId" = $1 AND routines."isPublic" = true
    `,
      [id]
    );

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

async function destroyRoutine(id) {
  try {
    await client.query(
      `
    DELETE FROM routine_activities
    WHERE "routineId" = $1;
    `,
      [id]
    );

    const {
      rows: [routine],
    } = await client.query(
      `
    DELETE FROM routines
    WHERE id = $1
    RETURNING *;
    `,
      [id]
    );

    return routine;
  } catch (error) {
    throw error;
  }
}

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
