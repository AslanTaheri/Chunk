require("dotenv").config();
const winston = require("winston");
const express = require("express");
const tasks = require("./routes/tasks");
const ErrorHandler = require("./middleware/ErrorHandler");
const catchAsync = require("./middleware/catchAsync");
const cors = require("cors");
const db = require("./db/db");
app.set("db", db); //providing one global connection to the database for more efficient connection pooling,
// rather than importing it separately in every route handler.

winston.add(winston.transports.File, { filename: "serverLog.log" });

const app = express();
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());

app.use("/api/v1/tasks", tasks);

// Handling the errors via the ErrorHandler:
process.on("uncaughtException", (err) => {
  console.log("THERE IS AN UNCAUGHT EXCEPTION.");
  winston.log("error", err.message);
});

// Database shutdown on application exit
process.on("SIGINT", async () => {
  console.log("Received SIGINT signal. Closing database connection pool...");
  try {
    await db.end(); // Close the connection pool
    console.log("Database connection pool closed. Exiting...");
    process.exit();
  } catch (err) {
    console.error("Error closing database connection pool:", err);
    process.exit(1); // Exiting with a non-zero code to indicate an error
  }
});

app.listen(port, () => console.log(`Server running on port ${port}...`));
