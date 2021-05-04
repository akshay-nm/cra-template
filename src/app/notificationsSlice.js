/**
 * NotificationsSlice (Redux)
 * Description: Notification state container
 * Original Author: Akshay Kumar <akshay.nm92@gmail.com>
 */

import { createSlice } from '@reduxjs/toolkit'
import { ulid } from 'ulid'

const initialState = {
  ids: [],
  values: {},
}
const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    resetNotifications: (state) => {
      state.ids = initialState.ids
      state.values = initialState.values
    },
    addNotification: (state, action) => {
      const id = ulid(Date.now())
      const { message, isWarning, isError, isSuccess } = action.payload
      state.values[id] = {
        id,
        message,
        isWarning: !!isWarning,
        isError: !!isError,
        isSuccess: !!isSuccess,
      }
      const map = new Set(state.ids)
      map.add(id)
      state.ids = [...map]
    },
    removeNotification: (state, action) => {
      delete state.values[action.payload]
      const map = new Set(state.ids)
      map.delete(action.payload)
      state.ids = [...map]
    },
  },
})

export const { resetNotifications, addNotification, removeNotification } = slice.actions

export const addWarningNotification = (message) => (dispatch) => dispatch(addNotification({ message, isWarning: true }))
export const addSuccessNotification = (message) => (dispatch) => dispatch(addNotification({ message, isSuccess: true }))
export const addErrorNotification = (message) => (dispatch) => dispatch(addNotification({ message, isError: true }))
export const addSimpleNotification = (message) => (dispatch) => dispatch(addNotification({ message }))

export default slice.reducer
