import {
  FETCH_LOGINSTATUS_REQUEST,
  FETCH_LOGINSTATUS_SUCCESS,
  FETCH_LOGINSTATUS_FAILURE,
} from "./actionTypes"

const initialState = {
  loading: false,
  loginStatus: [],
  error: "",
}

const loginStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGINSTATUS_REQUEST:
      return { ...state, loading: true }
    case FETCH_LOGINSTATUS_SUCCESS:
      return { loading: false, loginStatus: action.payload, error: "" }
    case FETCH_LOGINSTATUS_FAILURE:
      return { loading: false, loginStatus: [], error: action.payload }
    default:
      return state
  }
}

export default loginStatusReducer
