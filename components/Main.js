import React from "react";
import Task from "./Task";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { handleTasksState } from "../atoms/taskAtom";
import { useRecoilState } from "recoil";

import toCaps from "../utils/toCaps";

const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;

function Main({ tasksData }) {
  const router = useRouter();
  const [tasks, setTasks] = useState(tasksData);
  const [tasksSort, setTaskSort] = useState([]);
  const [title, setTitle] = useState("Today");
  const { nav } = router.query;

  const [taskState, setTaskState] = useRecoilState(handleTasksState);

  useEffect(() => {
    //updates the data coming from props
    setTasks(tasksData);
  }, [tasksData]);

  useEffect(() => {
    setTitle(toCaps(nav));
    //sort tasks according to page
    if (nav === "overdue") {
      setTaskSort(
        tasks?.filter(
          (task) =>
            task?.isCompleted === false &&
            new Date(task?.dueDate) - new Date().getTime() < 0
        )
      );
    } else if (nav === "archive") {
      setTaskSort(tasks?.filter((task) => task?.isCompleted === true));
    } else if (nav === "tasks") {
      setTaskSort(
        tasks?.filter(
          (task) =>
            task?.isCompleted === false &&
            new Date(task?.dueDate) - new Date().getTime() >= 0
        )
      );
    } else if (nav === "today") {
      setTaskSort(
        tasks?.filter(
          (task) =>
            task?.isCompleted === false &&
            new Date(task?.dueDate) - new Date().getTime() >= 0 &&
            new Date(task?.dueDate) - new Date().getTime() < day
        )
      );
    } else {
      setTaskSort(
        Array.isArray(tasks) ? tasks?.filter((task) => task?.tag === nav) : []
      );
    }
  }, [nav, tasks, taskState]);

  return (
    <div className="w-full px-10 pt-10 overflow-y-auto bg-white">
      <div className="text-3xl font-semibold">{title}</div>
      <div className="flex flex-col justify-center py-2 pb-10 space-y-2">
        {tasksSort.map((task, i) => (
          <Task task={task} key={i} />
        ))}
      </div>
    </div>
  );
}

export default Main;
