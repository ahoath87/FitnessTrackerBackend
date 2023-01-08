const express = require("express");
const router = express.Router();
const {
  getRoutineActivityById,
  updateRoutineActivity,
  destroyRoutineActivity,
  getRoutineById,
} = require("../db");
const { requireUser } = require("./utils");

// PATCH /api/routine_activities/:routineActivityId

router.patch("/:routineActivityId", requireUser, async (req, res, next) => {
  const { count, duration } = req.body;
  const id = req.params.routineActivityId;
  console.log("this is req.params", req.params);
  try {
    const originalRoutineActivity = await getRoutineActivityById(id);
    const routines = await getRoutineById(originalRoutineActivity.routineId);
    console.log("this is ORiginal ROUTINEactivity", originalRoutineActivity);
    console.log("this is REQ.USER", req.user);
    console.log("this is routines", routines);

    if (!originalRoutineActivity) {
      next({
        error: "error",
        name: "name",
        message: `RoutineActivityId ${id} not found`,
      });
    } else if (req.user && routines.creatorId != req.user.id) {
      next(
        res.status(403).send({
          error: "",
          name: "",
          message: `User ${req.user.username} is not allowed to update In the evening`,
        })
      );
    } else {
      const updatedRoutineActivity = await updateRoutineActivity({
        id,
        count,
        duration,
      });
      console.log("UPDATED ROUTINEATIVITY", updatedRoutineActivity);
      res.send(updatedRoutineActivity);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/routine_activities/:routineActivityId

router.delete("/:routineActivityId", requireUser, async (req, res, next) => {
  const id = req.params.routineActivityId;
  try {
    const originalRoutineActivity = await getRoutineActivityById(id);
    const routines = await getRoutineById(originalRoutineActivity.routineId);
    console.log("this is ORiginal ROUTINEactivity", originalRoutineActivity);
    console.log("this is REQ.USER", req.user);
    console.log("this is routines", routines);

    if (!originalRoutineActivity) {
      next({
        error: "error",
        name: "name",
        message: `RoutineActivityId ${id} not found`,
      });
    } else if (req.user && routines.creatorId != req.user.id) {
      next(
        res.status(403).send({
          error: "",
          name: "",
          message: `User ${req.user.username} is not allowed to delete In the afternoon`,
        })
      );
    }
    const deletedRoutineActivity = await destroyRoutineActivity(id);
    //   console.log("this is deleted routineActivity", deletedRoutineActivity);
    res.send(deletedRoutineActivity);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
