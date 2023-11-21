import axios from "axios";
import { backUrl } from "../config/config";

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export function loadPostAPI(data) {
  return axios.get(`/post/${data}`).then((res) => res.data);
}

export function loadPostsAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`).then((res) => res.data);
}

export function addPostAPI(data) {
  return axios.post("/post", data).then((res) => res.data);
}

export function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`).then((res) => res.data);
}

export function unLikePostAPI(data) {
  return axios.delete(`/post/${data}/like`).then((res) => res.data);
}

export function removePostAPI(data) {
  return axios.delete(`/post/${data}`).then((res) => res.data);
}

export function addCommentAPI(data) {
  return axios
    .post(`/post/${data.postId}/comment`, data)
    .then((res) => res.data);
}

export function loadUserPostsAPI(userId, lastId) {
  return axios
    .get(`/user/${userId}/posts?lastId=${lastId || 0}`)
    .then((res) => res.data);
}

export function loadHashtagPostsAPI(data) {
  return axios
    .get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`)
    .then((res) => res.data);
}

export function updatePostContentAPI(content, postId) {
  return axios
    .patch(`/post/${postId}/content`, { content: content })
    .then((res) => res.data);
}

export function removePostCommentAPI(data) {
  return axios
    .delete(`/comment/${data.commentId}?postId=${data.postId}`)
    .then((res) => res.data);
}

export function uploadImagesAPI(data) {
  return axios.post("/post/images", data).then((res) => res.data);
}
