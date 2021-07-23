import { actionOptions } from "../reducerInterfaces"
import { CLEAR_USER_ACCESS, SET_USER_ACCESS } from "../reduxConstants"

const initialState = {
  userAccess: !localStorage.getItem('userAccess') ? null : true
}

export const userReducer = (state = initialState, action: actionOptions) => {

  switch (action.type) {
    case SET_USER_ACCESS:
      localStorage.setItem('userAccess', action.payload.toString())
      return { ...state, userAccess: true }
    case CLEAR_USER_ACCESS:
      localStorage.removeItem('userAccess')
      return { ...state, userAccess: null }
    default:
      return state
  }
}