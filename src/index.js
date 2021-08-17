import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer, { rootSaga } from "./modules";
import App from "./App";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import { Router } from "react-router-dom";
import createSagaMiddleware from "@redux-saga/core";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory,
  },
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      ReduxThunk.withExtraArgument({ history: customHistory }),
      sagaMiddleware,
      logger
    )
  )
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Router history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
