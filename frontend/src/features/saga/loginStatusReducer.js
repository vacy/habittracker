import {
  FETCH_LOGINSTATUS_REQUEST,
  FETCH_LOGINSTATUS_SUCCESS,
  FETCH_LOGINSTATUS_FAILURE,
} from "./actionTypes"

const initialState = {
  loading: false,
  isLoggedIn: false,
  error: "",
}

const loginStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGINSTATUS_REQUEST:
      return { ...state, loading: true }
    case FETCH_LOGINSTATUS_SUCCESS:
      return { loading: false, isLoggedIn: true, error: "" }
    case FETCH_LOGINSTATUS_FAILURE:
      return { loading: false, isLoggedIn: false, error: action.payload }
    default:
      return state
  }
}

export default loginStatusReducer
