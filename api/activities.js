const express = require("express");
const {
  getAllActivities,
  createActivity,
  getActivityByName,
  getActivityById,
  updateActivity,
  getPublicRoutinesByActivity,
} = require("../db");
const { ActivityExistsError } = require("../errors");
const { get } = require("./users");
const { requireUser } = require("./utils");
const router = express.Router();

// GET /api/activities/:activityId/routines
router.get("/:activityId/routines", async (req, res, next) => {
  const { activityId } = req.params;
  // console.log("this is req.params in activites", req.params);
  try {
    const routinesByActivity = await getPublicRoutinesByActivity({
      id: activityId,
    });
    if (!routinesByActivity.length) {
      next({
        error: "",
        message: `Activity ${activityId} not found`,
        name: "ActivityNotFound",
      });
    } else {
      res.send(routinesByActivity);
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/activities
router.get("/", async (req, res, next) => {
  try {
    const allActivities = await getAllActivities();
    res.send(allActivities);
  } catch (error) {
    next(error);
  }
});

//POST /api/activities

router.post("/", requireUser, async (req, res, next) => {
  const { name, description } = req.body;
  //   const activityName = req.body.name;
  // console.log("thisisfodn", req.body.name);
  try {
    const namedActivity = await getActivityByName(name);

    // console.log("this is new activity", newActivity);
    // console.log("this is namedactivity", namedActivity);
    if (namedActivity) {
      next({
        error: "ActivityExistsError ",
        message: `An activity with name ${name} already exists`,
        name: "ActivityExistsError",
      });
    } else {
      const newActivity = await createActivity(req.body);
      res.send(newActivity);
    }
  } catch (error) {
    next(error);
  }
});

// PATCH /api/activities/:activityId

router.patch("/:activityId", requireUser, async (req, res, next) => {
  const { name, description } = req.body;
  const id = req.params.activityId;

  // console.log("REQ PARAMS", req.params);

  // const updateFields = {};

  try {
    const originalActivity = await getActivityById(id);
    const activityName = await getActivityByName(name);

    // console.log("ACTIVITY", activityName);

    if (!originalActivity) {
      next({
        name: "NoActivityFoundError",
        message: `Activity ${id} not found`,
      });
    } else if (activityName && activityName.name == req.body.name) {
      next({
        error: "DuplicateActivityError",
        name: "Duplicate Activity Error!",
        message: `An activity with name ${activityName.name} already exists`,
      });
    } else {
      const updatedActivity = await updateActivity({
        id,
        name,
        description,
      });

      res.send(updatedActivity);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
