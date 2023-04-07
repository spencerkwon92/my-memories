import {all, delay, fork, put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

import { LOG_IN_REQUEST,LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE } from '../reducers/user';

function loginAPI(data){
   return axios.post('/api/login', data);
}

function login(action){
  try{
    yield delay(1000);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    })
  }catch(error){
     yield put({
      type: LOG_IN_FAILURE,
      error: error.response.data,
     })
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

function* watchLogin(){
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout(){
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignUp(){
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* rootSaga(){
   yield all([
     fork(watchLogin),
     fork(watchLogout),
     fork(watchSignUp),
     fork(watchAddPost),
   ])
 }