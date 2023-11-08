import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import axios from "axios";

import userSlice from "./user";
import postSlice from "./post";
import { backUrl } from "../config/config";

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

const rootReducer = combineReducers({
  user: userSlice.reducer,
  post: postSlice.reducer,
});

export default rootReducer;
