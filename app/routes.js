import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { App, Home, Settings } from './containers/'

export default (
  <Route path='/' component={ App }>
    <IndexRoute component={ Home } />
    <Route path='/settings' component={ Settings } />
  </Route>
)
