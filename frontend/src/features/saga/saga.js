import { call, put, takeEvery } from "redux-saga/effects"
import {
  FETCH_LOGINSTATUS_REQUEST,
  fetchLoginStatusSuccess,
  fetchLoginStatusFailure,
} from "./actionTypes"

function* fetchLoginStatus() {
  try {
    const response = yield call(fetch, "http://localhost:4300/isLoggedin", {
      method: "get",
      credentials: "include",
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = yield response.status
    yield put(fetchLoginStatusSuccess(data))
  } catch (error) {
    yield put(fetchLoginStatusFailure(error.message))
  }
}

function* saga() {
  yield takeEvery(FETCH_LOGINSTATUS_REQUEST, fetchLoginStatus)
}

export default saga
