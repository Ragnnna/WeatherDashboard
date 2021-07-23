import React from 'react'
import { useDispatch } from 'react-redux'
import { githubProvider, googleProvider } from './config/authMethods'
import './index.css'
import { handleAuth } from './store/actions/asyncAction'

const Auth = () => {

  const dispatch = useDispatch()
  const googleAuthHandler = async () => {
    await dispatch(handleAuth(googleProvider))
  }

  const githubAuthHandler = async () => {
    await dispatch(handleAuth(githubProvider))
  }

  return (
    <div className="auth-page">
      <div className="auth-block">
        <p className="auth-title">Sign In</p>
        <div className="auth-block-choose">
          <button
            onClick={githubAuthHandler}
            className="btn-auth btn-github">
            <img
              className="img-google"
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg "
              alt=""
            />
            GitHub
          </button>
          <button
            onClick={googleAuthHandler}
            className="btn-auth btn-google">
            <img
              className="img-google"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/480px-Google_%22G%22_Logo.svg.png"
              alt=""
            />
            Google
          </button>
        </div>
      </div>
    </div>
  )
}

export { Auth }
