import React, { useEffect, useState } from 'react'
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps'
import { useDispatch, useSelector } from 'react-redux'
import { setCoordsAC } from '../store/actions/actionCreators'
import { fetchWeather, handleLogOut } from '../store/actions/asyncAction'
import { RootState } from '../store/store'
import { DialogWindow } from './DialogWindow'
import './components.css'
import { getWindowData } from '../config/window'

const Map: React.FC<any> = () => {
  const [toggleModal, setToggleModal] = useState<boolean>(false)
  const coords = useSelector((state: RootState) => state.coords)
  const dispatch = useDispatch()
  const [windowData, setWindowData] = useState(getWindowData());

  useEffect(() => {
    function handleResize() {
      setWindowData(getWindowData())
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  const getCoords = async (e: any) => {
    if (!e) {
      return navigator.geolocation.getCurrentPosition((pos) => {
        return dispatch(setCoordsAC({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }))
      })
    }
    const { lat, lng } = e.latLng
    const data = await dispatch(fetchWeather(lat, lng))
    if (data.length) {
      setToggleModal(true)
      return dispatch(setCoordsAC({
        lat: lat(),
        lng: lng()
      }))
    }
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
        windowData={windowData}
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