import { createWrapper } from "next-redux-wrapper";
import {applyMiddleware, createStore,compose} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'

import rootReducer from "../reducers";
import rootSags from'./sagas'

const configureStore = ({contents}) => {
  console.log(contents)
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
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
