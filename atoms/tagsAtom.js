import { atom } from "recoil";

export const tagsState = atom({
  key: "tagsState",
  default: false,
});
export const tagsData = atom({
  key: "tagsData",
  default: null,
});
