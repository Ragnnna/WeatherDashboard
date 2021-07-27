import { setUserAccessAC, setWeatherAC } from "./actionCreators"
import { firebase } from '../../config/firebase-config'
import { CLEAR_USER_ACCESS } from "../reduxConstants"
import moment from "moment"

export const fetchWeather = (lat: Function, lng: Function) => {

  const radius = 0.16
  const hour = 1.00

  return async (dispatch: Function) => {

    const currentWeatherCache = JSON.parse(localStorage.getItem('cache-weather')!) === null
      ? []
      : JSON.parse(localStorage.getItem('cache-weather')!)

    const filtredCache = currentWeatherCache
      .filter((el: any) => {
        const currentDate = +moment(Date.now()).format('hh.mm')
        return currentDate - el.timeCache >= hour
          ? false
          : true
      })

    const cachedFetch = filtredCache.find((el: any) => {
      const subtractedLon = Math.abs(el.city.coord.lon - +lng().toFixed(2)) <= radius
        ? true
        : false
      const subtractedLat = Math.abs(el.city.coord.lat - +lat().toFixed(2)) <= radius
        ? true
        : false
      if (subtractedLon && subtractedLat) {
        return el
      }
      return null
    })

    if (cachedFetch) {
      dispatch(setWeatherAC(cachedFetch.list))
      return cachedFetch.list
    }

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat().toFixed(2)}&lon=${lng().toFixed(2)}&units=metric&cnt=${5}&appid=${process.env.REACT_APP_WEATHER_KEY}`
    )
    const data = await res.json()
    if (!data) {
      return
    }
    data.timeCache = +moment(Date.now()).format('hh.mm')
    currentWeatherCache.push(data)
    localStorage.setItem('cache-weather', JSON.stringify(currentWeatherCache))
    dispatch(setWeatherAC(data.list))
    return data.list
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
