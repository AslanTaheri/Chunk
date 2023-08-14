import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";

export const Task = () => {
  const getTasks = axios.create({
    baseURL: "http://localhost:5000/api/v1/tasks",
  });

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks.get("/");
        setTasks(response.data.tasks);
        // console.log(tasks); !!!LEASSON LEARNED: state updates in React are asynchronous, and the updated value of tasks won't be available.
        // To see the updated value of tasks in the console, you should move the console.log statement outside the useEffect but within the component's body, where it will reflect the updated value in the next render.
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks(); // making sure I run the function, not just defining it! It took me some time to debug this.
  }, []);
  return (
    <>
      <div>tasks list</div>
      {tasks && // !!!LESSON: must use conditional because tasks is undefined in the first render cycle.
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            name={task.name}
            priority={task.priority}
            createdAt={task.created_at}
          />
        ))}
    </>
  );
};
