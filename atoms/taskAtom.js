import { atom } from "recoil";

export const userTask = atom({
  key: "userTasks",
  default: [],
});

export const handleTasksState = atom({
  key: "handleTasksState",
  default: true,
});
