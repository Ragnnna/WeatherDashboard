import { actionOptions } from "../reducerInterfaces"
import { SET_COORDS } from "../reduxConstants"

const initialState = {
  lat: null,
  lng: null,
}

const coordsReducer = (state = initialState, action: actionOptions) => {
  switch (action.type) {
    case SET_COORDS:
      return {
        ...state,
        lat: action.payload.lat,
        lng: action.payload.lng
      }
    default:
      return state
  }
}

export { coordsReducer }