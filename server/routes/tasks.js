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
      const db = req.app.get("db"); // Access the database connection from the app object
      const tasks = await db.query(
        `
        SELECT tasks.* 
        FROM tasks
        JOIN users_tasks ON users_tasks.task_id = tasks.id 
        WHERE users_tasks.user_id = $1;
        `,
        [(userId = 2)]
      );
      res.status(200).json({ tasks: tasks.rows });
    } catch (err) {
      console.log(err);
    }
  })
);

// Get a specific task.
router.get(
  "/:taskId",
  catchAsync(async (req, res) => {
    try {
      const db = req.app.get("db"); // Access the database connection from the app object
      const task = await db.query(
        `
        SELECT tasks.*
        FROM tasks
        JOIN users_tasks ON users_tasks.task_id = tasks.id
        WHERE tasks.id = $1
        AND users_tasks.user_id = $2;
        `,
        [req.params.taskId, (userId = 1)]
      );
      res.status(200).json({ task: task.rows[0] });
    } catch (err) {
      console.log(err);
    }
  })
);
// List of steps for a specific task
router.get(
  "/:taskId/steps",
  catchAsync(async (req, res) => {
    try {
      const db = req.app.get("db"); // Access the database connection from the app object
      const steps = await db.query(
        `
        SELECT steps.*
        FROM steps
        WHERE task_id = $1
        AND user_id = $2;
        `,
        [req.params.taskId, (userId = 1)]
      );
      res.status(200).json({ task: steps.rows });
    } catch (err) {
      console.log(err);
    }
  })
);

// A specific step of a task
router.get(
  "/:taskId/steps/:stepId",
  catchAsync(async (req, res) => {
    try {
      const db = req.app.get("db"); // Access the database connection from the app object
      const step = await db.query(
        `
        SELECT steps.*
        FROM steps
        WHERE task_id = $1
        AND id = $2
        AND user_id = $3;
        `,
        [req.params.taskId, req.params.stepId, (userId = 1)]
      );
      res.status(200).json({ task: step.rows[0] });
    } catch (err) {
      console.log(err);
    }
  })
);

module.exports = router;
