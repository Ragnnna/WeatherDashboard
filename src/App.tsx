import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { Auth } from './Auth';
import { WrappedMap } from './components/Map';
import { RootState } from './store/store';

const App = () => {
  const [userAccess, setUserAccess] = useState<boolean | null>(false)
  const user = useSelector((state: RootState) => state.user)
  useEffect(() => {
    setUserAccess(user.userAccess)
  }, [user.userAccess])

  const token = userAccess
  return (
    <div>
      {!token ?
        <Auth />
        :
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&v=3.exp&libraries=geometry,drawing,places`}
          containerElement={<div style={{ height: `100vh` }} />}
          loadingElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      }
    </div>
  )
}

export default App;
