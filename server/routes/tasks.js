const express = require("express");
const router = express.Router({ mergeParams: true }); //so that I can have access to paramas from the server.js
const db = require("./db");
const catchAsync = require("../middleware/catchAsync");

// here comes the authentication middleware

// gettin below routes for a specfic authenticated userId:

// /tasks : list of tasks that belong to the user with <userId>
router.get(
  "/",
  catchAsync(async (req, res) => {
    try {
      const tasks = await db.query(
        `
        SELECT tasks.* 
        FROM tasks
        JOIN users_tasks ON users_tasks.task_id = tasks.id 
        WHERE users_tasks.user_id = $1;
        `,
        [userID]
      );
      res.status(200).json({ tasks: tasks.rows });
    } catch (err) {
      console.log(err);
    }
  })
);

// /tasks/:taskId : get a specific task.
router.get("/:taskId", async (req, res) => {
  try {
    const task = await db.query(
      `
      SELECT tasks.*
      FROM tasks
      WHERE id = $1;
      `,
      [req.params.taskId]
    );
    res.status(200).json({ task: task.rows[0] });
  } catch (err) {
    console.log(err);
  }
});
// /tasks/:taskId/steps : list of steps for a specific task

// /tasks/:taskId/steps/:stepId : a specific step of a task

module.exports = router;
