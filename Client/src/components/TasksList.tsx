import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";

export const Task = () => {
  const getTasks = axios.create({
    baseURL: "http://localhost:5000/api/v1/tasks",
  });

  const [tasks, setTasks] = useState();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks.get("/");
        setTasks(response.data);
        console.log(tasks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks(); // making sure I run the function, not just defining it! It took me some time to debug this.
  }, []);
  return;
  <>
    <div>tasks list</div>;
    <TaskItem tasks={tasks} />
  </>;
};
