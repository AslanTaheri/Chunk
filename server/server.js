require("dotenv").config();
const winston = require("winston");
const express = require("express");
const routes = require("./routes/tasks");
const ErrorHandler = require("./middleware/ErrorHandler");
const catchAsync = require("./middleware/catchAsync");
const cors = require("cors");
const db = require("./db");

winston.add(winston.transports.File, { filename: "serverLog.log" });

const app = express();
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use("/tasks", routes);

// Handling the errors via the ErrorHandler:
process.on("uncaughtException", (err) => {
  console.log("THERE IS AN UNCAUGHT EXCEPTION.");
  winston.log("error", err.message);
});
app.use();

app.listen(port, () => console.log(`Server running on port ${port}...`));
