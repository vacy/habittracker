import { createStore, applyMiddleware } from "redux"
import createSagaMiddleware from "redux-saga"
import userReducer from "../reducers/userReducer"
import userSaga from "../sagas/userSaga"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(userReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(userSaga)

export default store
