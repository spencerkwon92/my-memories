import {all, delay, fork, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';
import {
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from '../reducers/user';

function loginAPI(data){
   return axios.post('/api/login', data);
}

function* login(action){
  try{
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  }catch(error){
     yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
     });
  }
}

function* logout(){
  try{
    yield delay(1000);
    yield put({
      type: LOG_OUT_SUCCESS,
    })
  }catch(error){
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data,
    })
  }
}

function* signUp(){
  try{
    yield delay(1000);
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

function* follow(action){
  try{
    yield delay(1000);
    yield puy({
      type: FOLLOW_SUCCESS,
      data:action.datta,
    })
  }catch{
    yield put({
      type: FOLLOW_FAILURE,
      error: error.response.data,
    })
  }
}

function* unfollow(action) {
  try {
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
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

export default function* rootSaga(){
   yield all([
     fork(watchLogin),
     fork(watchLogout),
     fork(watchSignUp),
     fork(watchFollow),
     fork(watchUnfollow),
    ])
 }