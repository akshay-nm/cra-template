import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import PageNotFound from '../PageNotFound'
import Home from '../Home'
import Login from '../Login'
import Register from '../Register'

// const RedirectToLogin = () => <Redirect to="/login" />
const RedirectToHome = () => <Redirect to="/home" />

const PageNotFoundContainer = () => <PageNotFound messageText="Phat gyi bhai!" buttonText="Wapis hole" />

const Routes = () => (
  <Switch>
    <Route exact path="/" component={RedirectToHome} />
    <Route path="/home" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/404" component={PageNotFoundContainer} />
    <Redirect to="/404" />
  </Switch>
)

export default Routes
