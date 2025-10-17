import { call, put, takeEvery } from "redux-saga/effects"
import {
  FETCH_LOGINSTATUS_REQUEST,
  fetchLoginStatusSuccess,
  fetchLoginStatusFailure,
} from "./actionTypes"
import { Scripts } from "react-router"

const apiHost = "https://healthifyme-api.vercel.app"
function* fetchLoginStatus() {
  try {
    const response = yield call(fetch, apiHost + "/isLoggedin", {
      method: "get",
      credentials: "include",
    })
    if (!response.ok) {
      throw new Error("i am not logged in")
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
