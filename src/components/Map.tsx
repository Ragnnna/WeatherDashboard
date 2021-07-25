import React, { useEffect, useState } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'
import { useDispatch, useSelector } from 'react-redux'
import { setCoordsAC } from '../store/actions/actionCreators'
import { fetchWeather, handleLogOut } from '../store/actions/asyncAction'
import { RootState } from '../store/store'
import { DialogWindow } from './DialogWindow'
import './components.css'


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

const Map: React.FC<any> = () => {
  const [toggleModal, setToggleModal] = useState<boolean>(false)
  const coords = useSelector((state: RootState) => state.coords)
  const dispatch = useDispatch()
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const getCoords = (e: any) => {
    if (!e) {
      return navigator.geolocation.getCurrentPosition((pos) => {
        return dispatch(setCoordsAC({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }))
      })
    }
    setToggleModal(true)
    const { lat, lng } = e.latLng
    dispatch(fetchWeather(lat, lng))
    return dispatch(setCoordsAC({
      lat: lat(),
      lng: lng()
    }))
  }

  const logOutHandler = async () => {
    await dispatch(handleLogOut())
  }

  const closeHandler = () => setToggleModal(false)

  useEffect(() => {
    getCoords(null)
  }, [])

  return (
    <div>
      <GoogleMap
        onClick={(e) => getCoords(e)}
        center={coords}
        defaultZoom={10}
      />
      {toggleModal && <DialogWindow
        windowData={windowDimensions}
        close={closeHandler}
      />}
      <button
        onClick={logOutHandler}
        className="btn-signout"
      >
        SignOut
      </button>
    </div>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export { WrappedMap }