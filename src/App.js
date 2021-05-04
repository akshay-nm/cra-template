import React, { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import Navigation from './components/Navigation'
import Notifications from './components/Notifications'
import ProtectedRoutes from './components/routes/ProtectedRoutes'
import Routes from './components/routes/Routes'

function App() {
  const userIsLoggedIn = useSelector((state) => state.session.userIsLoggedIn)

  return (
    <div className="h-full w-full flex flex-col font-chaptole bg-gray-300">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Binness by sdiot</title>
        <meta
          name="description"
          content='Binness is a platform for people who no longer want to "have to" think about bills.'
        />
      </Helmet>
      <Navigation />
      <div className="flex-grow overflow-auto">{userIsLoggedIn ? <ProtectedRoutes /> : <Routes />}</div>
      <Notifications />
    </div>
  )
}

export default App
