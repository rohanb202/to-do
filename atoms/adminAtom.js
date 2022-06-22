import { atom } from "recoil";
export const usersEntries = atom({
  key: "usersEntries",
  default: null,
});
export const todayTasks = atom({
  key: "todayTasks",
  default: [],
});
export const usersEntriesState = atom({
  key: "usersEntriesState",
  default: true,
});
export const reportEntries1 = atom({
  key: "reportEntries1",
  default: [],
});
export const reportEntries2 = atom({
  key: "reportEntries2",
  default: [],
});
export const reportState = atom({
  key: "reportState",
  default: true,
});
