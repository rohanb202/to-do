import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});
export const sidePanel = atom({
  key: "sidePanel",
  default: true,
});
