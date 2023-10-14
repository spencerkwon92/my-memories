import {all, delay, fork, put, takeLatest, call} from 'redux-saga/effects';
import axios from 'axios';
import {

  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  UPLOAD_PROFILE_IMAGE_REQUEST,
  UPLOAD_PROFILE_IMAGE_SUCCESS,
  UPLOAD_PROFILE_IMAGE_FAILURE,
  EDIT_PROFILE_IMAGE_REQUEST,
  EDIT_PROFILE_IMAGE_SUCCESS,
  EDIT_PROFILE_IMAGE_FAILURE,

} from '../reducers/user';


function loginAPI(data){
   return axios.post('/user/login', data);
}

function* login(action){
  try{
    const result = yield call(loginAPI, action.data)
    console.log(result) 
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  }catch(error){
     yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
     });
  }
}

function logOutAPI() {
  return axios.post('/user/logout');
}

function* logout(){
  try{
    yield call(logOutAPI)
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  }catch(error){
    console.error(error)
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    })
  }
}

function signUpAPI(data){
  return axios.post('/user', data);
}

function* signUp(action){
  try{
    const result = yield call(signUpAPI, action.data)
    console.log(result)
    yield put({
      type: SIGN_UP_SUCCESS,
    })    
  }catch(error){
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data,
    })
  }
  
}

function loadMyInfoAPI(){
  return axios.get('/user');
}

function* loadMyInfo(action){
  try{
    const result = yield call(loadMyInfoAPI)
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    })
  }catch(err){
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    })
  }
}

function loadUserAPI(data){
  return axios.get(`/user/${data}`);
}

function* loadUser(action){
  try{
    const result = yield call(loadUserAPI, action.data)
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    })
  }catch(err){
    yield put({
      type: LOAD_USER_FAILURE,
      error: err.response.data,
    })
  }
}


function changeNicknameAPI(data){
  return axios.patch('/user/nickname', {nickname: data}); //req.body.nickname
}

function* changeNickname(action){
  try{
    const result = yield call(changeNicknameAPI, action.data)
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    })
  }catch(err){
    console.error(err)
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err.response.data,
    })
  }
}

function followAPI(data){
  return axios.patch(`/user/${data}/follow`);
}

function* follow(action){
  try{
    const result = yield call(followAPI, action.data)
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data,
    })
  }catch{
    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data,
    })
  }
}

function unfollowAPI(data){
  return axios.delete(`/user/${data}/follow`);
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data)
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function loadFollowersAPI(data){
  return axios.get('/user/demo/followers', data); //Get/user/followers
}

function* loadFollowers(action){
  try{
    const result = yield call(loadFollowersAPI, action.data)
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      data: result.data,
    })
  }catch(err){
    console.error(err)
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error: err.response.data,
    })
  }
}

function loadFollowingsAPI(data){
  return axios.get('/user/demo/followings', data);
}

function* loadFollowings(action){
  try{
    const result = yield call(loadFollowingsAPI, action.data)
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      data: result.data,
    })
  }catch(err){
    console.error(err)
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error: err.response.data,
    })
  }
}

function uploadProfileImageAPI(data){
  return axios.post('/user/profileImage', data);
}

function* uploadProfileImage(action){
  try{
    const result = yield call(uploadProfileImageAPI, action.data)
    yield put({
      type: UPLOAD_PROFILE_IMAGE_SUCCESS,
      data: result.data,
    })
  }catch(err){
    console.error(err)
    yield put({
      type: UPLOAD_PROFILE_IMAGE_FAILURE,
      error: err.response.data,
    })
  }
}

function editProfileImageAPI(data){
  return axios.patch('/user/profileImage', data); // {profileImage:...} => req.body.
}

function* editProfileImage(action){
  try{
    const result = yield call(editProfileImageAPI, action.data)
    yield put({
      type: EDIT_PROFILE_IMAGE_SUCCESS,
      data: result.data,
    })
  }catch(err){
    console.error(err)
    yield put({
      type: EDIT_PROFILE_IMAGE_FAILURE,
      error: err.response.data,
    })
  }
}

function* watchLogin(){
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout(){
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignUp(){
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchFollow(){
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchUnfollow(){
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLoadUser(){
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchChangeNickname(){
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchLoadFollowers(){
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}

function* watchLoadFollowings(){
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchLoadMyInfo(){
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchUploadProfileImage(){
  yield takeLatest(UPLOAD_PROFILE_IMAGE_REQUEST, uploadProfileImage);
}

function* watchEditProfileImage(){
  yield takeLatest(EDIT_PROFILE_IMAGE_REQUEST, editProfileImage);
}

export default function* rootSaga(){
   yield all([
      fork(watchLogin),
      fork(watchLogout),
      fork(watchSignUp),
      fork(watchFollow),
      fork(watchUnfollow),
      fork(watchLoadUser),
      fork(watchChangeNickname),
      fork(watchLoadFollowers),
      fork(watchLoadFollowings),
      fork(watchLoadMyInfo),
      fork(watchUploadProfileImage),
      fork(watchEditProfileImage)
    ])
 }