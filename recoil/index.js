import { atom } from "recoil";

export const userState = atom({
  key: "userState",
  default: {
    me: null,
    userInfo: null,
    profileImagePath: null,
  },
});

export const postState = atom({
  key: "postState",
  default: {
    mainPosts: [],
    singlePost: null,
  },
});
