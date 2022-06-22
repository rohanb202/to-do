import React from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import {
  CheckCircleIcon as CheckCircleIcon2,
  TrashIcon,
} from "@heroicons/react/outline";
import Moment from "react-moment";
import { handleTasksState } from "../atoms/taskAtom";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";

function Task({ task }) {
  const [taskState, setTaskState] = useRecoilState(handleTasksState);
  const [user, setUser] = useRecoilState(userState);
  const deletePost = async () => {
    //to delete the task
    const response = await fetch(`/api/me/tasks/${task._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });
    setTaskState(true);
  };

  const updateTask = async () => {
    //to mark task as completed
    const response = await fetch(`/api/me/tasks/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({ isCompleted: !task.isCompleted }),
    });
    const data = await response.json();

    setTaskState(true);
  };
  return (
    <div className="flex items-center justify-between w-full py-2 space-x-4 rounded-lg bg-slate-100">
      <div className="flex items-center space-x-4 ">
        <div className="pl-2 cursor-pointer" onClick={updateTask}>
          {task.isCompleted ? (
            <CheckCircleIcon className="w-6" />
          ) : (
            <CheckCircleIcon2 className="w-6" />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <span
            className={`break-all flex text-base sm:text-lg  ${
              task.isCompleted && "line-through"
            }`}
          >
            {task.text}
          </span>
          {!task.isCompleted && (
            <Moment className="text-sm" fromNow>
              {task.dueDate}
            </Moment>
          )}
        </div>
      </div>
      <button onClick={deletePost} className="px-2 cursor-pointer">
        <TrashIcon className="w-6 " />
      </button>
    </div>
  );
}

export default Task;
