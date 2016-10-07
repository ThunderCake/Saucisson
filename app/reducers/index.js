import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

import movies from './movies'
import keyboard from './keyboard'

const rootReducer = combineReducers({
  routing,
  movies,
  keyboard
})

export default rootReducer
