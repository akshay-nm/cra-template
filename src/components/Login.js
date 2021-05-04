import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import useFormState from '@akshay-nm/use-form-state'
import { addWarningNotification, addSimpleNotification, addErrorNotification } from '../app/notificationsSlice'
import { logUserIn } from '../app/sessionSlice'
import { logger } from '../utils'

const axios = require('axios')

const Login = () => {
  const {
    isValid,
    isValidating,
    email,
    showEmailWarning,
    onEmailChange,
    password,
    showPasswordWarning,
    onPasswordChange,
  } = useFormState({
    states: [
      {
        name: 'email',
        default: '',
        defaultIsValid: false,
        mustBeValid: true,
        validator: () => true,
      },
      {
        name: 'password',
        default: '',
        defaultIsValid: false,
        mustBeValid: true,
        validator: (val) => val.length > 5,
      },
    ],
  })

  const dispatch = useDispatch()

  const [isLocked, setIsLocked] = useState(false)

  const login = useCallback(() => {
    if (isLocked) dispatch(addSimpleNotification('Please wait'))
    else if (isValid) {
      setIsLocked(true)
      axios
        .post(`${process.env.REACT_APP_API_SERVER_URL}/sessions`, { email, password })
        .then((res) => res.data)
        .then((res) => dispatch(logUserIn(res)))
        .catch((error) => {
          if (error.response.status === 400) dispatch(addErrorNotification('Incorrect email and/or password'))
          // eslint-disable-next-line no-console
          else logger('unhandled error: login: ', error)
        })
    } else dispatch(addWarningNotification('Please fill the form correctly'))
  }, [email, password, dispatch, isLocked, isValid])

  return (
    <div className="">
      <div className="p-24">
        <div className="text-lg font-bold mb-2">Login</div>
        <div className="mb-2">
          <div>Email</div>
          <div>
            <input
              className={`px-2 py-1 border rounded focus:bg-gray-300 ${isLocked ? 'bg-gray-400 text-gray-700' : ''} ${
                showEmailWarning ? 'border-red-400' : ''
              }`}
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              disabled={isLocked}
            />
          </div>
          {showEmailWarning && <div className="text-xs text-red-400">Please enter a valid email address.</div>}
        </div>
        <div className="mb-2">
          <div>Password</div>
          <div>
            <input
              className={`px-2 py-1 border rounded focus:bg-gray-300 ${isLocked ? 'bg-gray-400 text-gray-700' : ''} ${
                showPasswordWarning ? 'border-red-400' : ''
              }`}
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              disabled={isLocked}
              type="password"
            />
          </div>
          {showPasswordWarning && <div className="text-xs text-red-400">Please enter a password.</div>}
        </div>
        <div className="mb-2">
          <Link to="/account-recovery">
            <span className="underline">Forgot password?</span>
          </Link>
        </div>
        <div className="mb-2">
          <button className="button" onClick={login} disabled={isLocked || isValidating}>
            Login
          </button>
        </div>
        <div>
          <span className="text-sm">
            <Link to="/register">
              <span className="underline">Don&apos;t have an account? Sign up</span>
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
