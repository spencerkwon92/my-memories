import axios from "axios";
import { backUrl } from "../config/config";

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export function logInAPI(data) {
  return axios.post("/user/login", data).then((res) => res.data);
}

export function logOutAPI() {
  return axios.post("/user/logout").then((res) => res.data);
}

export function signUpAPI(data) {
  return axios.post("/user", data).then((res) => res.data);
}

export function loadMyInfoAPI() {
  return axios.get("/user").then((res) => res.data);
}

export function loadUserAPI(data) {
  return axios.get(`/user/${data}`).then((res) => res.data);
}

export function followAPI(data) {
  return axios.patch(`/user/${data}/follow`).then((res) => res.data);
}

export function unfollowAPI(data) {
  return axios.delete(`/user/${data}/follow`).then((res) => res.data);
}

export function changeNicknameAPI(data) {
  return axios
    .patch("/user/nickname", { nickname: data })
    .then((res) => res.data);
}

export function loadFollowersAPI() {
  return axios.get("/user/followers").then((res) => res.data);
}

export function loadFollowingsAPI() {
  return axios.get("/user/followings").then((res) => res.data);
}

export function editProfileImageAPI(data) {
  return axios.patch("/user/profileImage", data).then((res) => res.data);
}

export function uploadProfileImageAPI(data) {
  return axios.post("/user/profileImage", data).then((res) => res.data);
}
