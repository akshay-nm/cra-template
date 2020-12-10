import React from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import Settings from './Settings'
import Home from './Home'
import PageNotFound from './PageNotFound'

const ProtectedRoutes = () => (
  <Switch>
    <Route exact path="/">
      <div>/</div>
    </Route>
    <Route path="/settings" component={Settings} />
    <Route path="/home" component={Home} />
    <Route path="/login">
      <Redirect to="/" />
    </Route>
    <Route path="/register">
      <Redirect to="/" />
    </Route>
    <Route exact path="/404" component={PageNotFound} />
  </Switch>
)

export default ProtectedRoutes
