import {applyMiddleware, createStore, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from "next-redux-wrapper";
import {composeWithDevTools} from 'redux-devtools-extension'

import rootReducer from "../reducers";
import rootSags from'../sagas'

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  console.log(action);
  return next(action);
};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, loggerMiddleware]
  const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares))
    :composeWithDevTools(applyMiddleware(...middlewares))
  const store = createStore(rootReducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSags);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
