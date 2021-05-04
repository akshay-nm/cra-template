import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logUserOut } from '../app/sessionSlice'

const Navigation = () => {
  const history = useHistory()
  const sessionIsValid = useSelector((state) => state.session.sessionIsValid)

  const dispatch = useDispatch()

  const onLogoutClick = () => dispatch(logUserOut())
  const onLoginClick = () => history.push('/login')
  const onRegisterClick = () => history.push('/register')

  return (
    <div className="p-4 w-100 flex items-center">
      <div className="flex-grow">{process.env.REACT_APP_NAME}</div>
      {sessionIsValid ? (
        <div>
          <button type="button" className="px-2 py-1 border rounded" onClick={onLogoutClick}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button type="button" className="px-2 py-1 border rounded mr-2" onClick={onLoginClick}>
            Login
          </button>
          <button type="button" className="px-2 py-1 border rounded" onClick={onRegisterClick}>
            Register
          </button>
        </div>
      )}
    </div>
  )
}

export default Navigation
