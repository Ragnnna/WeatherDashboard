import { CLEART_WEATHER_DATA, SET_COORDS, SET_USER_ACCESS, SET_WEATHER_DATA } from "../reduxConstants";
import { set_coords_payload } from "./actionInterfaces";

export const setCoordsAC = (payload: set_coords_payload) => ({ type: SET_COORDS, payload })
export const setWeatherAC = (payload: any) => ({ type: SET_WEATHER_DATA, payload })
export const clearWeatherAC = () => ({ type: CLEART_WEATHER_DATA })
export const setUserAccessAC = () => ({ type: SET_USER_ACCESS, payload: true })