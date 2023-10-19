import {all, fork} from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user';
import postSaga from './post';
import {backUrl, devUrl} from '../config/config';

//ec2 back server IP
axios.defaults.baseURL = (process.env.NODE_ENV==='production')?backUrl:devUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga(){
  
  yield all([
    fork(userSaga),
    fork(postSaga),
  ])
} 