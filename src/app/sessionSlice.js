import jwtDecode from 'jwt-decode'

import { createSlice } from '@reduxjs/toolkit'
import { updateUserId } from './userSlice'

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
  },
  reducers: {
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    updateRefreshToken: (state, action) => {
      state.refreshToken = action.payload
    },
    updateIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const { updateAccessToken, updateRefreshToken, updateIsLoggedIn } = sessionSlice.actions

export const login = ({ accessToken, refreshToken }) => (dispatch) => {
  dispatch(updateAccessToken(accessToken))
  dispatch(updateRefreshToken(refreshToken))
  dispatch(updateUserId(jwtDecode(accessToken).id))
  dispatch(updateIsLoggedIn(true))
}

export const logout = () => (dispatch) => {
  dispatch(updateRefreshToken(null))
  dispatch(updateAccessToken(null))
  dispatch(updateUserId(null))
  dispatch(updateIsLoggedIn(false))
}

export default sessionSlice.reducer