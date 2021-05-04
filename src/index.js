/**
 * App component
 * Description: Bootstrap the application
 * Original Author: Akshay Kumar <akshay.nm92@gmail.com>
 */

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import axios from 'axios'
import { SWRConfig } from 'swr'
import configureStore from './app/configureStore'
import { logUserOut, updateAccessToken } from './app/sessionSlice'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { addWarningNotification } from './app/notificationsSlice'
import { logger } from './utils'

// import Loading from './components/Loading'

const { store, persistor } = configureStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <SWRConfig
            value={{
              onError: (error, key) => {
                switch (error.message) {
                  case '401':
                    if (store.getState().session.accessToken) store.dispatch(updateAccessToken(null))
                    else store.dispatch(logUserOut())
                    break
                  case '500':
                    store.dispatch(addWarningNotification('Oops! Something went wrong.'))
                    break
                  default:
                    logger(`Unhandled error: swr: ${key}: ${error.message}`)
                }
              },
              refreshInterval: 3000,
              dedupingInterval: 3000,
              fetcher: async (key) => {
                const { accessToken } = store.getState().session
                const sessionIsBeingRefreshed = store.getState().session.isBeingRefreshed

                if (sessionIsBeingRefreshed) return // skip requests if session is being refreshed

                try {
                  const response = await axios.get(`${process.env.REACT_APP_API_SERVER_URL}${key}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                  })
                  // eslint-disable-next-line consistent-return
                  return response.data
                } catch (error) {
                  if (error.response?.status) throw Error(`${error.response.status}`)
                  throw Error('408')
                }
              },
            }}
          >
            <App />
          </SWRConfig>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
