import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import movies from './movies'
import keyboard from './keyboard'
import settings from './settings'

const rootReducer = combineReducers({
  routing,
  movies,
  keyboard,
  settings
})

export default rootReducer
