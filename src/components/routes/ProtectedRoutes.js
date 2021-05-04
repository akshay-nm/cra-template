import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import PageNotFound from '../PageNotFound'
import useSessionRefresh from '../../hooks/useSessionRefresh'
import Dashboard from '../Dashboard'

const RedirectToCustomers = () => <Redirect to="/customers" />
const PageNotFoundContainer = () => <PageNotFound messageText="Phat gyi bhai!" buttonText="Wapis hole" />

const ProtectedRoutes = () => {
  useSessionRefresh()
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route path="/login" component={RedirectToCustomers} />
      <Route path="/register" component={RedirectToCustomers} />
      <Route path="/404" component={PageNotFoundContainer} />
      <Redirect to="/404" />
    </Switch>
  )
}

export default ProtectedRoutes
