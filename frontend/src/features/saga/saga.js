import { call, put, takeEvery } from "redux-saga/effects"
import {
  FETCH_LOGINSTATUS_REQUEST,
  fetchLoginStatusSuccess,
  fetchLoginStatusFailure,
} from "./actionTypes"
import { Scripts } from "react-router"
import Cookies from "universal-cookie"
import APIHOST from "../../env.jsx"

function* fetchLoginStatus() {
  try {
    const cookies = new Cookies()

    const response = yield call(fetch, APIHOST + "/isLoggedin", {
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
