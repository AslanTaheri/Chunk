const express = require("express");
const router = express.Router({ mergeParams: true }); //so that I can have access to paramas from the server.js
const catchAsync = require("../middleware/catchAsync");

// GET list of tasks that belong to the user with <userId>
router.get(
  "/",
  catchAsync(async (req, res) => {
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
  })
);

// ADD a new task.
router.post(
  "/",
  catchAsync(async (req, res) => {
    const db = req.app.get("db");
    const task = await db.query(
      `
        INSERT INTO tasks (name, priority, created_at, due_at, description, completed_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURN *;
        `,
      [
        req.body.name,
        req.body.priority,
        req.body.created_at,
        req.body.due_at,
        req.body.description,
        req.body.completed_at,
      ]
    );

    console.log(task);

    const users_tasks = await db.query(
      `
      INSERT INTO users_tasks (user_id, task_id)
      VALUES ($1, $2)
      RETURN *;
      `,
      [userId, task.rows[0].id]
    );

    res.status(200).json({ task: task.rows[0] });
  })
);

// GET a specific task.
router.get(
  "/:taskId",
  catchAsync(async (req, res) => {
    const db = req.app.get("db");
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
  })
);

// Get the List of steps for a specific task
router.get(
  "/:taskId/steps",
  catchAsync(async (req, res) => {
    const db = req.app.get("db");
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
  })
);

// Get A specific step of a task
router.get(
  "/:taskId/steps/:stepId",
  catchAsync(async (req, res) => {
    const db = req.app.get("db");
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
  })
);

module.exports = router;
