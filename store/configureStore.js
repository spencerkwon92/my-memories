import { applyMiddleware, createStore, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";

import reducer from "../reducers";

function getServerState() {
  return typeof document !== "undefined"
    ? JSON.parse(document.querySelector("#__NEXT_DATA__").textContent)?.props
        .pageProps.initialState
    : undefined;
}

const serverState = getServerState();

const makeStore = () =>
  configureStore({
    reducer,
    devTools: true,
    middlewares: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState: serverState,
  });

// export const configureStore = () => {
//   const sagaMiddleware = createSagaMiddleware();
//   const middlewares = [sagaMiddleware, loggerMiddleware];
//   const enhancer =
//     process.env.NODE_ENV === "production"
//       ? compose(applyMiddleware(...middlewares))
//       : composeWithDevTools(applyMiddleware(...middlewares));
//   const store = createStore(rootReducer, enhancer);
//   store.sagaTask = sagaMiddleware.run(rootSags);
//   return store;
// };

const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});

export default wrapper;
