import { call, put, takeEvery } from "redux-saga/effects"
import {
  FETCH_USERS_REQUEST,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "../actions/userActions"

function* fetchUsers() {
  try {
    const response = yield call(fetch, "http://localhost:4300/isLoggedin", {
      method: "get",
      credentials: "include",
    })
    if (!response.ok) {
      throw new Error("Network response was not ok")
    }
    const data = yield response.status
    yield put(fetchUsersSuccess(data))
  } catch (error) {
    yield put(fetchUsersFailure(error.message))
  }
}

function* userSaga() {
  yield takeEvery(FETCH_USERS_REQUEST, fetchUsers)
}

export default userSaga
