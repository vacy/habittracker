export const FETCH_LOGINSTATUS_REQUEST = "FETCH_LOGINSTATUS_REQUEST"
export const FETCH_LOGINSTATUS_SUCCESS = "FETCH_LOGINSTATUS_SUCCESS"
export const FETCH_LOGINSTATUS_FAILURE = "FETCH_LOGINSTATUS_FAILURE"

export const fetchLoginStatusRequest = () => ({
  type: FETCH_LOGINSTATUS_REQUEST,
})

export const fetchLoginStatusSuccess = loginStatus => ({
  type: FETCH_LOGINSTATUS_SUCCESS,
  payload: loginStatus,
})

export const fetchLoginStatusFailure = error => ({
  type: FETCH_LOGINSTATUS_FAILURE,
  payload: error,
})
