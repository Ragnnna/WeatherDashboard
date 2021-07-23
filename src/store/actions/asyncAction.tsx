import { setUserAccessAC, setWeatherAC } from "./actionCreators"
import { firebase } from '../../config/firebase-config'
import { CLEAR_USER_ACCESS } from "../reduxConstants"

export const fetchWeather = (lat: Function, lng: Function) => {
  return async (dispatch: Function) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat().toFixed(2)}&lon=${lng().toFixed(2)}&units=metric&cnt=${5}&appid=${process.env.REACT_APP_WEATHER_KEY}`
    )
    const data = await res.json()
    if (!data) {
      return
    }
    dispatch(setWeatherAC(data.list))
  }
}

const socialAuth = async (provider: any) => {
  return await firebase
    .auth()
    .signInWithPopup(provider())
    .then(res => res)
    .catch(e => {
      return 'error'
    })
}

export const handleAuth = (provider: any) => {
  return async (dispatch: Function) => {
    const res = await socialAuth(provider)
    if (res === 'error') {
      console.log('e')
      return
    }
    dispatch(setUserAccessAC())
  }
}

export const handleLogOut = () => {
  return async (dispatch: Function) => {
    await firebase.auth().signOut()
    dispatch({ type: CLEAR_USER_ACCESS })
  }
}
