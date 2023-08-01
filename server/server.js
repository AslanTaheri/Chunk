require("dotenv").config();
const express = require("express");
const routes = require("./routes/tasks");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = process.env.PORT || 5001;
app.use(cors());
app.use(express.json());
app.use("/tasks", routes);

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = db.query("SELECT * FROM tasks WHERE ");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => console.log(`Server running on port ${port}...`));
