import { combineReducers } from "redux";
import { coordsReducer } from "./coordsReducer";
import { userReducer } from "./userReducer";
import { weatherReducer } from "./weatherReducer";


const rootReducer = combineReducers({
  weather: weatherReducer,
  coords: coordsReducer,
  user: userReducer
})

export { rootReducer }
