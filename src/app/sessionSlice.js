/**
 * SessionSlice (Redux)
 * Description: Store session related information
 * Original Author: Akshay Kumar <akshay.nm92@gmail.com>
 */

import { createSlice } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'

const initialState = {
  isValid: false,
  accessToken: null,
  refreshToken: null,
  user: null,
  isBeingRefreshed: false,
  beganFrom: null,
  expiresOn: null,
}

const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    updateSessionIsValid: (state, action) => {
      state.isValid = action.payload
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    updateRefreshToken: (state, action) => {
      state.refreshToken = action.payload
    },
    updateUser: (state, action) => {
      state.user = action.payload
    },
    updateSessionIsBeingRefreshed: (state, action) => {
      state.sessionIsBeingRefreshed = action.payload
    },
    updateSessionBeganFrom: (state, action) => {
      state.beganFrom = action.payload
    },
    updateSessionExpiresOn: (state, action) => {
      state.expiresOn = action.payload
    },
  },
})

export const {
  updateSessionIsValid,
  updateAccessToken,
  updateRefreshToken,
  updateUser,
  updateSessionIsBeingRefreshed,
  updateSessionBeganFrom,
  updateSessionExpiresOn,
} = slice.actions

export const logUserIn = ({ accessToken, refreshToken }, from = 'login', history) => (dispatch) => {
  const { name, id, email, type, exp } = jwtDecode(accessToken)
  dispatch(updateSessionIsBeingRefreshed(true))
  dispatch(updateAccessToken(accessToken))
  dispatch(updateRefreshToken(refreshToken))
  dispatch(updateUser({ id, name, email, type }))
  dispatch(updateSessionIsValid(true))
  dispatch(updateSessionBeganFrom(from))
  dispatch(updateSessionExpiresOn(exp))
  dispatch(updateSessionIsBeingRefreshed(false))
  history.replace('/loading-on-session-create')
}

export const logUserOut = () => (dispatch) => {
  dispatch(updateAccessToken(initialState.accessToken))
  dispatch(updateRefreshToken(initialState.refreshToken))
  dispatch(updateUser(initialState.user))
  dispatch(updateSessionIsValid(initialState.isValid))
  dispatch(updateSessionIsBeingRefreshed(initialState.sessionIsBeingRefreshed))
  dispatch(updateSessionBeganFrom(initialState.beganFrom))
  dispatch(updateSessionExpiresOn(initialState.expiresOn))
}

export const refreshSession = ({ accessToken, refreshToken }) => (dispatch) => {
  const { name, id, email, type, exp } = jwtDecode(accessToken)
  dispatch(updateAccessToken(accessToken))
  dispatch(updateRefreshToken(refreshToken))
  dispatch(updateUser({ id, name, email, type }))
  dispatch(updateSessionExpiresOn(exp))
  dispatch(updateSessionIsBeingRefreshed(false))
}

export default slice.reducer
