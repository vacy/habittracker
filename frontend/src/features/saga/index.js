import { createStore, applyMiddleware, combineReducers } from "redux"
import createSagaMiddleware from "redux-saga"
import loginStatusReducer from "./loginStatusReducer"
import saga from "./saga"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({ loginStatus: loginStatusReducer }),
  applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(saga)

export default store
