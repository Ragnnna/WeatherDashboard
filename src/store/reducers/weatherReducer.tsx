import { actionOptions } from "../reducerInterfaces"
import { CLEART_WEATHER_DATA, SET_WEATHER_DATA } from "../reduxConstants"

const initialState = {
  weatherData: []
}

const weatherReducer = (state = initialState, action: actionOptions) => {

  switch (action.type) {
    case SET_WEATHER_DATA:
      return {
        ...state,
        weatherData: action.payload
      }
    case CLEART_WEATHER_DATA:
      return {
        ...state,
        weaterData: []
      }
    default:
      return state
  }
}

export { weatherReducer }
