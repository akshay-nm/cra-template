/**
 * PageNotFound component
 * Description: Hook to send a request to api server
 * Original Author: Akshay Kumar <akshay.nm92@gmail.com>
 */

import axios from 'axios'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { logger } from '../utils'

const useRequest = (key, type = 'post', isProtected = true) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState()
  const accessToken = useSelector((state) => state.session.accessToken)
  const send = useCallback(
    async (payload) => {
      setLoading(true)
      try {
        const axiosParams = []

        axiosParams.push(`${process.env.REACT_APP_API_SERVER_URL}${key}`)
        if (payload) axiosParams.push(payload)
        if (isProtected)
          axiosParams.push({
            headers: { Authorization: `Bearer ${accessToken}` },
          })

        const res = await axios[type](...axiosParams)
        setData(res.data)
        setError(null)
      } catch (err) {
        // eslint-disable-next-line no-console
        logger('Error: useRequest: ', err)
        setData()
        setError(error)
      }
      setLoading(false)
    },
    [accessToken, isProtected, key, type],
  )

  return { loading, error, data, send }
}

export default useRequest
