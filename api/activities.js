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
const { requireUser } = require("./utils");
const router = express.Router();

// GET /api/activities/:activityId/routines

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
  console.log("thisisfodn", req.body.name);
  try {
    const namedActivity = await getActivityByName(name);

    // console.log("this is new activity", newActivity);
    console.log("this is namedactivity", namedActivity);
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

router.patch("/:activitiesId", requireUser, async (req, res, next) => {
  const { name, description } = req.body;
  const { activityId } = req.params;
  const updateFields = {};

  if (name) {
    updateFields.name = name;
  }
  if (description) {
    updateFields.description = description;
  }
  try {
    // const oldName = await getActivityByName(name);
    const originalActivity = await getActivityById(activityId);

    if (!originalActivity) {
      next({
        error: "No Original Activity to update ",
        message: `An activity with with with name already exists`,
        name: "ActivityExistsError",
      });
      // } else if (oldName === updateFields.name) {
      //   next({
      //     error: "ActivityExistsError ",
      //     message: `An activity with name ${name} already exists`,
      //     name: "ActivityExistsError",
      //   });
      // } else
    } else if (originalActivity) {
      const updatedActivity = await updateActivity(activityId, updateFields);
      console.log("THIS IS UPDATED ACTIVITY", updatedActivity);
      res.send({ activity: updatedActivity });
    } else {
      console.log("you failed miserably");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
