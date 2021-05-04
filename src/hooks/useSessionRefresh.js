/**
 * PageNotFound component
 * Description: Hook to preemptively refresh session
 * Original Author: Akshay Kumar <akshay.nm92@gmail.com>
 */

import axios from 'axios'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logUserOut, refreshSession, updateSessionIsBeingRefreshed } from '../app/sessionSlice'
import useInterval from './useInterval'

const useSessionRefresh = () => {
  const userId = useSelector((state) => state.session.user?.id)
  const refreshToken = useSelector((state) => state.session.refreshToken)
  const accessToken = useSelector((state) => state.session.accessToken)
  const sessionIsBeingRefreshed = useSelector((state) => state.session.isBeingRefreshed)
  const sessionExpiresOn = useSelector((state) => state.session.expiresOn)

  const dispatch = useDispatch()

  const refresh = useCallback(() => {
    dispatch(updateSessionIsBeingRefreshed(true))
    axios({
      url: `${process.env.REACT_APP_API_SERVER_URL}/sessions/refresh`,
      method: 'POST',
      data: {
        user: userId,
        refreshToken,
      },
    })
      .then((res) => res.data)
      .then((res) => dispatch(refreshSession(res)))
      .catch(() => dispatch(logUserOut()))
  }, [dispatch, refreshToken, userId])

  useEffect(() => {
    if (!sessionIsBeingRefreshed && !accessToken && refreshToken) refresh()
  }, [accessToken, sessionIsBeingRefreshed, sessionExpiresOn, refreshToken, refresh])

  useInterval(() => {
    if (accessToken && refreshToken && sessionExpiresOn - Math.floor(Date.now() / 1000) < 10) refresh()
  }, 1000)
}

export default useSessionRefresh
