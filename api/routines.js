const express = require("express");
const {
  getAllPublicRoutines,
  createRoutine,
  getRoutineById,
  updateRoutine,
  destroyRoutine,
  getAllRoutinesByUser,
  addActivityToRoutine,
  getActivityById,
  getRoutineActivitiesByRoutine,
} = require("../db");
const { post } = require("./users");
const { requireUser } = require("./utils");
const router = express.Router();

// GET /api/routines

router.get("/", async (req, res, next) => {
  try {
    const allPublicRoutines = await getAllPublicRoutines();
    res.send(allPublicRoutines);
  } catch (error) {
    next(error);
  }
});

// POST /api/routines

router.post("/", requireUser, async (req, res, next) => {
  const { creatorId, name, goal, isPublic } = req.body;
  try {
    // console.log("this is req.user.id", req.user.id);
    if (req.user) {
      req.body.creatorId = req.user.id;
    }
    const newRoutine = await createRoutine(req.body);
    res.send(newRoutine);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/routines/:routineId
router.patch("/:routineId", requireUser, async (req, res, next) => {
  const { isPublic, name, goal } = req.body;
  const id = req.params.routineId;
  console.log("REQ PARAMS", req.params);

  try {
    const originalRoutine = await getRoutineById(id);

    console.log("ORIGINAL ROUTINE", originalRoutine);

    if (!originalRoutine) {
      next({
        error: "error",
        name: "NoRoutineFoundError",
        message: `Routine ${id} not found`,
      });
    } else if (req.user && originalRoutine.creatorId != req.user.id) {
      console.log("this is money money", originalRoutine.id);
      //   console.log("this is more money", req.user.id);
      next(
        res.status(403).send({
          error: "",
          message: `User ${req.user.username} is not allowed to update Every day`,
          name: "",
        })
      );
    } else {
      const updatedRoutine = await updateRoutine({
        id,
        isPublic,
        name,
        goal,
      });
      console.log("UPDATED ROUTINE", updatedRoutine);
      res.send(updatedRoutine);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/routines/:routineId
router.delete("/:routineId", requireUser, async (req, res, next) => {
  const id = req.params.routineId;
  try {
    const routineToDelete = await getRoutineById(id);
    // console.log("this is req.params.routineId", req.params.routineId);
     console.log("this is routineTODelete", routineToDelete);
    // const findRoutines = await getRoutineById(id);
    if (routineToDelete && routineToDelete.creatorId === req.user.id) {
      const deletedRoutine = await destroyRoutine(id);
      res.send(deletedRoutine);
    } else {
      next(
        res.status(403).send({
          error: "",
          message: `User ${req.user.username} is not allowed to delete On even days`,
          name: "",
        })
      );
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/routines/:routineId/activities
router.post("/:routineId/activities", requireUser, async (req, res, next) => {
  const routineId = req.params.routineId;
  const { activityId, count, duration} = req.body;
  const routine = await getRoutineById(routineId);
  const activity = await getActivityById(activityId);
  try {
    const activities = await getRoutineActivitiesByRoutine(req.params.routineId);
    console.log("this is activities", activities)
    const [filteredActivities] = activities.filter(
      (activity) => activity.id === activityId
    );
    console.log("this is filteredActivities", filteredActivities);
    if (routine.id === routineId && filteredActivities.id === activityId) {
      next({
        error: "",
        message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`,
        name: ""
      })
    } else if (req.user) {
      const routineWithActivity = await addActivityToRoutine({routineId, activityId, count,  duration});
      res.send(routineWithActivity);
    }
  } catch (error) {
    next(error);
  }
})

module.exports = router;
