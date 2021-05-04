import useFormState from '@akshay-nm/use-form-state'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addErrorNotification, addSimpleNotification, addWarningNotification } from '../app/notificationsSlice'
import { logUserIn } from '../app/sessionSlice'
import { logger } from '../utils'

const Register = () => {
  const {
    isValid,
    isValidating,
    resetForm,
    name,
    showNameWarning,
    onNameChange,
    mobile,
    showMobileWarning,
    onMobileChange,
    email,
    showEmailWarning,
    onEmailChange,
    password,
    showPasswordWarning,
    onPasswordChange,
    confirmPassword,
    showConfirmPasswordWarning,
    onConfirmPasswordChange,
  } = useFormState({
    states: [
      {
        name: 'name',
        default: '',
        defaultIsValid: false,
        mustBeValid: true,
        validator: () => true,
      },
      {
        name: 'mobile',
        default: '',
        defaultIsValid: false,
        mustBeValid: true,
        validator: () => true,
      },
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
        validator: () => true,
      },
      {
        name: 'confirmPassword',
        default: '',
        defaultIsValid: false,
        mustBeValid: true,
        validator: () => true,
      },
    ],
  })
  const [isLocked, setIsLocked] = useState(false)
  const dispatch = useDispatch()

  const register = useCallback(() => {
    if (isLocked) dispatch(addSimpleNotification('Please wait'))
    else if (isValid) {
      setIsLocked(true)
      axios
        .post(`${process.env.REACT_APP_API_SERVER_URL}/users`, { name, mobile, email, password })
        .then((res) => res.data)
        .then((res) => dispatch(logUserIn(res)))
        .catch((error) => {
          if (error.response.status === 400) dispatch(addErrorNotification('Please fill the form correctly'))
          if (error.response.status === 403)
            dispatch(addErrorNotification('User account already exists, try logging in instead'))
          // eslint-disable-next-line no-console
          else logger('unhandled error: register: ', error)
        })
    } else dispatch(addWarningNotification('Please fill the form correctly'))
  }, [email, password, mobile, name, dispatch, isLocked, isValid])

  return (
    <div className="">
      <div className=" p-24">
        <div className="text-lg font-bold mb-2">Sign up</div>
        <div className="mb-2">
          <div>Name</div>
          <div>
            <input
              className={`px-2 py-1 border rounded focus:bg-gray-300 ${isLocked ? 'bg-gray-400 text-gray-700' : ''} ${
                showNameWarning ? 'border-red-400' : ''
              }`}
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              disabled={isLocked}
            />
          </div>
          {showEmailWarning && <div className="text-xs text-red-400">Please enter a your name.</div>}
        </div>
        <div className="mb-2">
          <div>Mobile</div>
          <div>
            <input
              className={`px-2 py-1 border rounded focus:bg-gray-300 ${isLocked ? 'bg-gray-400 text-gray-700' : ''} ${
                showMobileWarning ? 'border-red-400' : ''
              }`}
              value={mobile}
              onChange={(event) => onMobileChange(event.target.value)}
              disabled={isLocked}
            />
          </div>
          {showEmailWarning && <div className="text-xs text-red-400">Please enter a valid mobile number.</div>}
        </div>
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
          <div>Confirm Password</div>
          <div>
            <input
              className={`px-2 py-1 border rounded focus:bg-gray-300 ${isLocked ? 'bg-gray-400 text-gray-700' : ''} ${
                showConfirmPasswordWarning ? 'border-red-400' : ''
              }`}
              value={confirmPassword}
              onChange={(event) => onConfirmPasswordChange(event.target.value)}
              disabled={isLocked}
              type="password"
            />
          </div>
          {showPasswordWarning && <div className="text-xs text-red-400">Passwords do not match</div>}
        </div>

        <div className="mb-2">
          <button className="button" onClick={register} disabled={isLocked || isValidating}>
            Sign up
          </button>
          <button className="button" onClick={resetForm} disabled={isLocked || isValidating}>
            Clear
          </button>
        </div>
        <div>
          <Link to="/login">
            <span className="underline text-sm">Already have an account? Login instead</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
