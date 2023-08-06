const express = require("express");
const router = express.Router({ mergeParams: true }); //so that I can have access to paramas from the server.js
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
        [userId]
      );
      res.status(200).json({ tasks: tasks.rows });
    } catch (err) {
      console.log(err);
    }
  })
);

// /tasks/:taskId : get a specific task.
router.get(
  "/:taskId",
  catchAsync(async (req, res) => {
    try {
      const task = await db.query(
        `
        SELECT tasks.*
        FROM tasks
        JOIN users_tasks ON users_tasks.task_id = tasks.id
        WHERE tasks.id = $1
        AND users_tasks.user_id = $2;
        `,
        [req.params.taskId, userId]
      );
      res.status(200).json({ task: task.rows[0] });
    } catch (err) {
      console.log(err);
    }
  })
);
// /tasks/:taskId/steps : list of steps for a specific task

// /tasks/:taskId/steps/:stepId : a specific step of a task

module.exports = router;
